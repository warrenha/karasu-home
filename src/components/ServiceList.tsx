import Card from './ui-simple/Card'
import { getIcon, getText, serviceTitle, serviceTexts } from './ServiceTexts'

import type { TextLine } from './ServiceTexts'

/*
 * - - - - - - - - - -
 *
 * List of services provided.
 *
 * - - - - - - - - - -
 */
const ServiceList = () => {
    const renderTextLine = (t: TextLine) => {
        const icon = getIcon(t)
        const text = getText(t) || ''
        return (
            <div key={text} className="text-left">
                {!text.length ? '\u00A0' : ( // &nbsp;
                    <div className="flex items-center gap-2">
                        {icon}
                        {text}
                    </div>
                )}
            </div>
        )
    }
    return (
        <Card data-id="ServiceList" title={serviceTitle} >
            { serviceTexts.map(t => renderTextLine(t)) }
        </Card>
    )
}

export default ServiceList
