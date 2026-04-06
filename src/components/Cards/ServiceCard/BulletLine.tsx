import { getIcon, getText } from './serviceTexts'

import type { IconText } from './serviceTexts'

type Props = {
    line?: IconText | null
}

/*
 * - - - - -  - - - - -  - - - - -
 *
 * Renders a bullet point (icon) with text.
 *
 * - - - - -  - - - - -  - - - - -
 */
export const BulletLine = (props: Props) => {
    const { line } = props
    const icon = getIcon(line) // ReactNode | null
    const text = getText(line) || '' // string

    return (
        <div data-id="BulletLine" key={text}
            className="flex items-center gap-2 text-left">
            {!text.length ? (
                '\u00A0' // &nbsp;
            ) : (
            <>
                {icon}
                {text}
            </>
            )}
        </div>
    )
}
