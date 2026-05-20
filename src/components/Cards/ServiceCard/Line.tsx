import { ArrowSmallRightIcon, RightIcon } from '@/components/ui/simple'

import type { ChildrenProps, ClassNameProps } from '@/utils/Props'

type Props = {
    label?: string | null

    icon?: 'chevron' | 'arrow' | null
}
& ChildrenProps
& ClassNameProps

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
            className="flex items-center text-left">
            <>
                <span>{label}</span>
                { icon ? (
                    <div className="px-[5px] text-[#446dc6]" >
                        {icon}
                    </div>
                ) : (
                    '\u00a0' // &nbsp;
                )}
                <span className="text-neutral-500" >
                    {children}
                </span>
            </>
        </div>
    )
}
