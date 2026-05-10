import { RightIcon } from '@/components/ui/simple'
import { isString } from '@/utils/Utils'

import type { ChildrenProps, ClassNameProps } from '@/utils/Props'

type Props = {
    label?: string | null
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

    return (
        <div data-id="Line"
            className="flex items-center text-left">
            <>
                <span>{label}</span>
                { isString(label) && !label.endsWith(':') ? (
                    RightIcon
                ) : (
                    '\u00A0' // &nbsp;
                )}
                <span className="text-neutral-500" >
                    {children}
                </span>
            </>
        </div>
    )
}
