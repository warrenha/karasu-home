import * as THREE from 'three'

type DisposableSceneObject = {
    geometry?: { dispose: () => void };
    material?: DisposableMaterial | DisposableMaterial[];
};

type DisposableMaterial = {
    map?: { dispose: () => void };
    dispose: () => void;
};

/*
 * Creates the complete 3d scene, with camera, lighting and renderer.
 */
export const createScene = (
    div: HTMLDivElement,
    coreTemperatures: number[]  // [48, 38, 64, 81, 96]
) => {
    console.debug('Creating 3d temperature scene...')

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111318);

    function getSceneSize(): { width: number; height: number } {
        const rect = div.getBoundingClientRect();
        return {
            width: Math.max(1, rect.width),
            height: Math.max(1, rect.height)
        };
    }

    const initialSize = getSceneSize();
    const camera = new THREE.PerspectiveCamera(40, initialSize.width / initialSize.height, 0.1, 100);
    camera.position.set(0, 6.7, 6.6);
    camera.lookAt(0, 2.85, -0.05);

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initialSize.width, initialSize.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    div.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 0.52));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyLight.position.set(-5, 7, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.left = -7;
    keyLight.shadow.camera.right = 7;
    keyLight.shadow.camera.top = 7;
    keyLight.shadow.camera.bottom = -7;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 18;
    scene.add(keyLight);

    const barDepth = 0.55;
    const maxBarHeight = 5;
    const minBarHeight = 0.12;
    const baseY = 0;

    const grid = new THREE.GridHelper(12, 12, 0x364150, 0x242b35);
    grid.position.y = -0.02;
    scene.add(grid);

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(14, 14),
        new THREE.ShadowMaterial({
            color: 0x000000,
            opacity: 0.34
        })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.03;
    floor.receiveShadow = true;
    scene.add(floor);

    const clampTemperature = (value: number): number => {
        return Math.max(0, Math.min(100, Number(value) || 0));
    }

    const colorForTemperature = (value: number): any => {
        const t = clampTemperature(value) / 100;
        const hue = THREE.MathUtils.lerp(210, 0, t);
        const lightness = THREE.MathUtils.lerp(54, 58, t);
        //return new THREE.Color().setHSL(hue / 360, 0.86, lightness / 100);
        return new THREE.Color().setHSL(
            hue / 360,
            1.0,
            lightness / 100,
            THREE.SRGBColorSpace
        );
    }

    const makeTextTexture = (text: string, font: string): any => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error('Canvas text rendering is unavailable.');
        }

        canvas.width = 256;
        canvas.height = 96;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#f6f7fb';
        context.font = font;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);

        return new THREE.CanvasTexture(canvas);
    }

    const makeLabel = (text: string): any => {
        const texture = makeTextTexture(text, 'bold 34px Arial');
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(1.4, 0.52, 1);
        return sprite;
    }

    const makeGroundLabel = (text: string): any => {
        const texture = makeTextTexture(text, 'bold 44px Arial');
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthWrite: false
        });
        const groundLabel = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 0.55), material);
        groundLabel.rotation.x = -Math.PI / 2;
        return groundLabel;
    }

    const disposeMaterial = (material: DisposableMaterial) => {
        material.map?.dispose();
        material.dispose();
    }

    const clearBars = () => {
        while (group.children.length) {
            const child = group.children.pop() as DisposableSceneObject;
            child.geometry?.dispose();

            if (Array.isArray(child.material)) {
                child.material.forEach(disposeMaterial);
            } else if (child.material) {
                disposeMaterial(child.material);
            }
        }
    }

    const setCoreTemperatures = (temperatures: number[]) => {
        clearBars();

        const values = temperatures.map(clampTemperature);
        const spacing = 1.1;
        const totalWidth = (values.length - 1) * spacing;

        values.forEach((temperature, index) => {
            const height = THREE.MathUtils.lerp(minBarHeight, maxBarHeight, temperature / 100);
            const geometry = new THREE.BoxGeometry(0.72, height, barDepth);
            const material = new THREE.MeshStandardMaterial({
                color: colorForTemperature(temperature),
                roughness: 0.42,
                metalness: 0.08
            });
            const bar = new THREE.Mesh(geometry, material);
            bar.castShadow = true;
            bar.receiveShadow = true;

            bar.position.x = index * spacing - totalWidth / 2;
            bar.position.y = baseY + height / 2;
            group.add(bar);

            const label = makeLabel(`${Math.round(temperature)}°`);
            label.position.set(bar.position.x, height + 0.45, 0);
            group.add(label);

            const coreLabel = makeGroundLabel(`${index + 1}`);
            coreLabel.position.set(bar.position.x, 0.02, barDepth / 2 + 0.42);
            group.add(coreLabel);
        });
    }

    setCoreTemperatures(coreTemperatures);

    const resize = () => {
        const size = getSceneSize();
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
        renderer.setSize(size.width, size.height);
    }

    window.addEventListener('resize', resize);

    const animate = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();

    return renderer;
}

