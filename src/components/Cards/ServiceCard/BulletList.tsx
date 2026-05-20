import { BulletLine } from './BulletLine'
import type { IconText } from './serviceTexts'

type Props = {
    lines?: IconText[] | null
}

/*
 * - - - - -  - - - - -  - - - - -
 *
 * Renders a list of bullet points, with a custom icon & text.
 *
 * - - - - -  - - - - -  - - - - -
 */
export const BulletList = (props: Props) => {
    const lines = props.lines || []
    console.debug('Hello world!')

    return (
        <div data-id="BulletList"
            className="flex flex-col items-start gap-1">
            { lines.map((line, index) => (
                <BulletLine
                    key={`line-${index}`}
                    line={line} />
            ))}
        </div>
    )
}
