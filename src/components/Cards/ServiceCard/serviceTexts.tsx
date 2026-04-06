import { isObject, isString } from '@/utils/Utils'
import { DataIcon, DbIcon, ToolIcon, UserIcon, PuzzleIcon } from '@/components/ui/simple'

import type { ReactNode } from 'react'

// - - - - - Lines of Text - - - - - //

export type IconText = string | {
    icon?: ReactNode | null
    text?: string | null
}

export const getText = (
    t: IconText | null | undefined
): string | null => (
    isString(t) ? t : isObject(t) ? (t.text || null) : null
)

export const getIcon = (
    t: IconText | null | undefined
): ReactNode | null => (
    isObject(t) ? (t.icon || null) : null
)

// - - - - - Services - - - - - //

export const serviceTexts: IconText[] = [
    { icon: UserIcon, text: 'User interface design and development' },
    { icon: PuzzleIcon, text: 'Custom components - fast, responsive & modern tech' },
    { icon: DataIcon, text: 'Data visualization using charts and maps showing data layers (GIS)' },
    '',
    { icon: ToolIcon, text: 'Technology stack: React, TypeScript, Node.js, Express server' },
    { icon: DbIcon, text: 'Database: PostgreSQL, Oracle, SQL Server' }
]
