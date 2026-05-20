import { getIcon, getText } from './serviceTexts'

import type { IconText } from './serviceTexts'

type Props = {
    line?: IconText | null
}

/*
 * - - - - -  - - - - -  - - - - -
 *
 * Renders a bullet point, with a custom icon & text.
 *
 * - - - - -  - - - - -  - - - - -
 */
export const BulletLine = (props: Props) => {
    const { line } = props
    const icon = getIcon(line) // ReactNode | null
    const text = getText(line) // string | ReactNode | null

    return (
        <div data-id="BulletLine"
            className="flex justify-start items-start gap-3 text-left">
            { !text ? (
                '\u00A0' // &nbsp;
            ) : (
            <>
                <span className="pt-1">
                    {icon}
                </span>
                {text}
            </>
            )}
        </div>
    )
}
