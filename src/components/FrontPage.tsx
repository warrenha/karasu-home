import ContactCard from './ContactCard'
import ServiceList from './ServiceList'
import ThreeScene from '../three/ThreeScene'

/*
 * - - - - - - - - - -
 *
 * Front page of the website.
 *
 * - - - - - - - - - -
 */
const FrontPage = () => {
    console.info('FrontPage RENDER')
    return (
        <div
            data-id="FrontPage"
            className="flex flex-col content-center items-center h-full w-full text-center bg-white text-gray-800 gap-6 py-2">
            <div className="flex flex-col gap-2" >
                <h1>Karasu Software</h1>
                <h2>Software consultancy, application design & engineering</h2>
            </div>
            <ThreeScene />
            <div className="flex flex-col items-stretch gap-10">
                <ServiceList />
                <ContactCard />
            </div>
            <div className="flex flex-col gap-2 text-base">
                <div>
                    Page created using React, Typescript, Tailwind CSS, Vite, pnpm, and Three.js
                </div>
            </div>
        </div>
    )
}

export default FrontPage
