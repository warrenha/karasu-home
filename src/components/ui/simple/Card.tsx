import { cn } from '@/lib/utils'

import type { ChildrenProps, ClassNameProps } from '@/utils/Props'

type Props = {
    title?: string | null
}
& ClassNameProps
& ChildrenProps

/*
 * - - - - - - - - - - - - - - -
 *
 * Card component
 *
 * - - - - - - - - - - - - - - -
 */
export const Card = (props: Props) => {
    const { title, className, children } = props
    return (
        <div
            data-id={props['data-id'] || 'Card'}
            className={cn(
                'bg-neutral-100 text-neutral-700 border border-[#c5c5c5] rounded-2xl shadow-[3px_3px_0_0_rgb(247,247,247)]',
                className
            )}>
            {title && (
                <h2 className="pb-2 text-[15px] font-[500] py-4 px-5">
                    {title}
                </h2>
            )}
            <div className="text-[14px] leading-[1.6] pt-2 pb-4 px-5">
                {children}
            </div>
        </div>
    )
}

