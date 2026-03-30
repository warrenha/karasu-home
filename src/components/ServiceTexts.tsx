import { isObject, isString } from '@/utils/Utils'
import { DataIcon, DbIcon, ToolIcon, UserIcon, PuzzleIcon } from '@/components/ui-simple'

import type { ReactNode } from 'react'

// - - - - - Lines of Text - - - - - //

export type IconText = {
    icon?: ReactNode | null
    text?: string | null
}

export type TextLine = string | IconText

export const getText = (t: TextLine): string | null => (
    isString(t) ? t : isObject(t) ? (t.text || null) : null
)

export const getIcon = (t: TextLine): ReactNode | null => (
    isObject(t) ? (t.icon || null) : null
)

// - - - - - Services - - - - - //

export const serviceTitle = 'Services'

export const serviceTexts: TextLine[] = [
    { icon: UserIcon, text: 'User interface design and development' },
    { icon: PuzzleIcon, text: 'Custom components - fast, responsive & modern styling' },
    { icon: DataIcon, text: 'Data visualization using charts and maps showing data layers (GIS)' },
    '',
    { icon: ToolIcon, text: 'Technology stack: React, TypeScript, Node.js, Express server' },
    { icon: DbIcon, text: 'Database: PostgreSQL, Oracle, SQL Server' }
]
