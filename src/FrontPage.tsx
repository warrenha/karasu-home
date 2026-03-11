import ThreeScene from './ThreeScene'
//import rookImage from '@/assets/images/rook-blender.png'

/*
 * - - - - - - - - - -
 *
 * - - - - - - - - - -
 */
const FrontPage = () => {
    console.info('FrontPage RENDER')
    return (
        <div data-id="FrontPage"
            className="flex flex-col content-center items-center h-full w-full text-center bg-white text-gray-800 gap-4 py-2">
            <h1>Karasu Software</h1>
            <h2>Software consultancy, application design & engineering</h2>
            {/*
            <div className="flex w-full bg-neutral-700 justify-center" >
                <img src={rookImage} alt="Rook" className="h-48 w-auto" data-id="img" />
            </div>
            */}
            <ThreeScene />
        </div>
    )
}

export default FrontPage
