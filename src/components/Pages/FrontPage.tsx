import { ContactCard, ServiceCard } from '@/components/Cards'
import { WireframeScene } from '@/three/wireframe'
import { CoreTempsScene } from '@/three/system/'

import { cn } from "@/lib/utils"

/*
 * - - - - - - - - - - - - - - -
 *
 * Front page of the website.
 *
 * - - - - - - - - - - - - - - -
 */
export const FrontPage = () => {
    return (
        <div
            data-id="FrontPage"
            className={cn(
                "flex flex-col content-center items-center h-full w-full",
                "text-center overflow-y-auto bg-white text-gray-800 gap-[25px] pt-2 pb-10")} >
            <div className="flex flex-col gap-2" >
                <h1>Karasu Software</h1>
                <h2 >カラスソフトウェア</h2>
                <h2 >Software consultancy, application design & engineering</h2>
            </div>
            <WireframeScene />
            <div className="flex flex-col items-stretch gap-[25px]">
                <ServiceCard />
            </div>
            { /* <SystemSection /> */ }
            <CoreTempsScene />
            <div className="flex flex-col items-stretch gap-[25px] min-w-[450px]">
                <ContactCard />
            </div>
            <div className="flex flex-col gap-2 text-base">
                <div>
                    Page created using React, Typescript, Tailwind CSS, Vite, and Three.js.
                    Hosted on Cloudflare Pages.
                </div>
                <div>
                    WebSockets are used to send live system information from a Node.js/Hono server.
                </div>
            </div>
        </div>
    )
}

