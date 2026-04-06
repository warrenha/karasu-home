import Card from '../ui-simple/Card'
import { serviceTexts } from './ServiceData'
import { BulletLine } from './BulletLine'

/*
 * - - - - -  - - - - -  - - - - -
 *
 * List of services provided.
 *
 * - - - - -  - - - - -  - - - - -
 */
export const ServiceCard = () => {
    return (
        <Card data-id="ServiceList" title="Services" >
            { serviceTexts.map(line => (
                <BulletLine line={line} />
            ))}
        </Card>
    )
}

