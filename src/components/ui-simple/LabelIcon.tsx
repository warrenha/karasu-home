import { cn } from "@/lib/utils"

import type { ReactNode } from 'react'
import type { ChildrenProps, ClassNameProps } from '@/utils/Props.ts'

type Props = {
    label?: string | ReactNode | null
    icon?: ReactNode | null
}
& ChildrenProps
& ClassNameProps

/*
 * - - - - - - - - - -
 *
 * Text with an icon, both aligned vertically.
 *
 * - - - - - - - - - -
 */
const LabelIcon = (props: Props) => {
    const { label, icon, className, children } = props;
    return (
        <div data-id="LabelIcon" className="flex items-center gap-2" >
            { label && (
                <span>{label}</span>
            )}
            { icon }
            { children }
        </div>
    )
}

export default LabelIcon
