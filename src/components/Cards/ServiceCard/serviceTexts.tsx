import { isObject, isString } from '@/utils/Utils'
import { DataIcon, DbIcon, ToolIcon, UserIcon, PuzzleIcon, SearchIcon } from '@/components/ui/simple'
import { Line } from './Line'

import type { ReactNode } from 'react'

// - - - - - Lines of Text - - - - - //

export type IconText = string | {
    icon?: ReactNode | null
    text?: string | ReactNode | null
}

export const getText = (
    t: IconText | null | undefined
): string | ReactNode | null => (
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
    { icon: PuzzleIcon, text: (
        <Line label="Custom components" >
            Fast, responsive & modern tech stack
        </Line>
    )},
    { icon: DataIcon, text: (
        <Line label="Data visualization" >
             Charts, maps showing (GIS) data layers
        </Line>
    )},
    '',
    { icon: ToolIcon, text: (
        <Line label="Technology stack:" >
            React, TypeScript, Node.js, Express server, Hono,
        </Line>
    )},
    { icon: ToolIcon, text: (
        <span className="text-neutral-500" >
           ... Zustand/Redux, Tanstack Query, WebSockets, Three.js
        </span>
    )},
    { icon: SearchIcon, text: (
        <Line label="Integration Testing:" >
            Jest, Vitest, React Testing Library (RTL)
        </Line>
    )},
    { icon: SearchIcon, text: (
        <Line label="End-to-End (E2E) Testing:" >
            Playwright
        </Line>
    )},
    { icon: DbIcon, text: (
        <Line label="Database:" >
            PostgreSQL, Oracle, SQL Server, MySQL
        </Line>
    )}
]
