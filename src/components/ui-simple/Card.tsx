import { cn } from "@/lib/utils"

import type { ChildrenProps, ClassNameProps } from '@/utils/Props.ts'

type Props = {
    title?: string | null
}
& ChildrenProps
& ClassNameProps

// border border-neutral-400 shadow-[3px_3px_0_0_rgb(249,249,249)]
// box-shadow: 3px 3px 0 0 #f7f7f7;
/*
 * - - - - - - - - - -
 *
 * Card component
 *
 * - - - - - - - - - -
 */
const Card = (props: Props) => {
    const { className, title, children } = props;
    return (
        <div data-id={cn(props["data-id"], "Card")} >
            <div className={cn(
                    "bg-neutral-100 text-neutral-700 border border-[#c5c5c5] rounded-2xl shadow-[3px_3px_0_0_rgb(247,247,247)]",
                    className)} >
                { title && (
                    <div className="pb-2 text-[15px] font-[500] py-4 px-5" >
                        { title }
                    </div>
                )}
                <div className="text-[14px] leading-[1.6] pt-2 pb-4 px-5">
                    { children }
                </div>
            </div>
        </div>
    )
}

export default Card
