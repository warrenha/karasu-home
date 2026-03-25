import type { ReactNode } from 'react'

type Props = {
    title?: string | null
    children?: ReactNode
}

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
            <div className="border border-neutral-300 rounded-2xl px-8 pb-4 pt-2 shadow-[3px_3px_0_0_rgb(249,249,249)]">
                { title && (
                    <div className="border-b border-neutral-300 pb-2 text-lg font-semibold" >
                        { title }
                    </div>
                )}
                <div className="text-lg pt-4">
                    { children }
                </div>
            </div>
        </div>
    )
}

export default Card
