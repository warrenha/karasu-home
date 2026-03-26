import type { ReactNode } from 'react'

type Props = {
    title?: string | null
    children?: ReactNode
}

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
    const { title, children } = props;
    return (
        <div>
            <div className="bg-neutral-100 text-neutral-700 border border-[#c5c5c5] rounded-2xl shadow-[3px_3px_0_0_rgb(247,247,247)]">
                { title && (
                    <div className="pb-2 text-[15px] font-[400] py-4 px-5" >
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
