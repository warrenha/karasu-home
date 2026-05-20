import { ArrowSmallRightIcon, RightIcon } from '@/components/ui/simple'

import type { ChildrenProps, ClassNameProps } from '@/utils/Props'

type Props = {
    label?: string | null

    icon?: 'chevron' | 'arrow' | null
}
& ChildrenProps
& ClassNameProps

//const COLOR = '#446dc6'
//const COLOR = '#f15922'

/*
 * - - - - -  - - - - -  - - - - -
 *
 * Renders a line of text.
 *
 * - - - - -  - - - - -  - - - - -
 */
export const Line = (props: Props) => {
    const { label, children } = props

    const icon = props.icon === 'chevron' ? RightIcon : 
        props.icon === 'arrow' ? ArrowSmallRightIcon : null

    return (
        <div data-id="Line"
            className="flex flex-wrap items-center gap-1">
            <span>{label}</span>
            { icon ? (
                <span className="px-[5px] text-[#f15922]" >
                    {icon}
                </span>
            ) : (
                '\u00a0' // &nbsp;
            )}
            <span className="text-neutral-500" >
                {children}
            </span>
        </div>
    )
}
