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
        <Line label="Custom components" icon="arrow" >
            Fast, responsive & modern tech stack
        </Line>
    )},
    { icon: DataIcon, text: (
        <Line label="Data visualization" icon="arrow" >
             Charts, maps with (GIS) data layers, SVGs, PDFs
        </Line>
    )},
    //'',
    { icon: ToolIcon, text: (
        <Line label="Technology stack" icon="arrow" >
            React, TypeScript, Node.js, Express server, Hono,
        </Line>
    )},
    { icon: null, text: (
        <span className="text-neutral-500">
           <span className="ml-6" >... Zustand/Redux, Tanstack Query, WebSockets, Three.js</span>
        </span>
    )},
    { icon: SearchIcon, text: (
        <Line label="Integration Testing" icon="arrow" >
            Jest, Vitest, React Testing Library (RTL)
        </Line>
    )},
    { icon: SearchIcon, text: (
        <Line label="End-to-End (E2E) Testing" icon="arrow" >
            Playwright
        </Line>
    )},
    { icon: DbIcon, text: (
        <Line label="Database" icon="arrow" >
            PostgreSQL, Oracle, SQL Server, MySQL
        </Line>
    )}
]
