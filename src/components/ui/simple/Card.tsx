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
                'text-neutral-700 text-base',
                className
            )}>
            {title && (
                <h2 className="text-lg font-[500] px-5">
                    {title}
                </h2>
            )}
            <div className="leading-[1.6] pt-2 pb-4 px-5">
                {children}
            </div>
        </div>
    )
}

