import ThreeScene from '../three/ThreeScene'

/*
 * - - - - - - - - - -
 *
 * - - - - - - - - - -
 */
const FrontPage = () => {
    console.info('FrontPage RENDER')
    return (
        <div
            data-id="FrontPage"
            className="flex flex-col content-center items-center h-full w-full text-center bg-white text-gray-800 gap-4 py-2">
            <h1>Karasu Software</h1>
            <h2>Software consultancy, application design & engineering</h2>
            <ThreeScene />
            <div className="my-2 text-xl text-red-600">This is a placeholder!</div>
            <div className="flex flex-col gap-2 text-base">
                <div>
                    Page created using React, Typescript, Tailwind CSS, Vite, pnpm, and Three.js
                </div>
            </div>
        </div>
    )
}

export default FrontPage
