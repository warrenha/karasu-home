import ContactCard from './ContactCard'
import ServiceList from './ServiceList'
import ThreeScene from '../three/ThreeScene'

import { cn } from "@/lib/utils"

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
            className={cn(
                "flex flex-col content-center items-center h-full w-full",
                "text-center overflow-y-auto bg-white text-gray-800 gap-[25px] pt-2 pb-10")} >
            <div className="flex flex-col gap-2" >
                <h1>Karasu Software</h1>
                <h2>Software consultancy, application design & engineering</h2>
            </div>
            <ThreeScene />
            <div className="flex flex-col items-stretch gap-[25px]">
                <ServiceList />
                <ContactCard />
            </div>
            <div className="flex flex-col gap-2 text-base">
                <div>
                    Page created using React, Typescript, Tailwind CSS, Vite, and Three.js.
                    Hosted on Cloudflare Pages.
                </div>
            </div>
        </div>
    )
}

export default FrontPage
