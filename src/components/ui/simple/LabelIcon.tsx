import { cn } from '@/lib/utils'

import type { ChildrenProps, ClassNameProps } from '@/utils/Props.ts'
import type { ReactNode } from 'react'

type Props =
    & {
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
export const LabelIcon = (props: Props) => {
    const { label, icon, className, children } = props
    return (
        <div data-id="LabelIcon" className={cn('flex items-center gap-2', className)}>
            {label && <span>{label}</span>}
            {icon}
            {children}
        </div>
    )
}

