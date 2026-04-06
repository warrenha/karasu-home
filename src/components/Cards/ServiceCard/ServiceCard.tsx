import { Card } from '@/components/ui/simple'
import { serviceTexts } from './serviceTexts'
import { BulletLine } from './BulletLine'

import { getText } from './serviceTexts'

/*
 * - - - - -  - - - - -  - - - - -
 *
 * List of services provided.
 *
 * - - - - -  - - - - -  - - - - -
 */
export const ServiceCard = () => {
    return (
        <Card data-id="ServiceCard" title="Services" >
            { serviceTexts.map((line, index) => (
                <BulletLine line={line} key={getText(line)||`${index}`} />
            ))}
        </Card>
    )
}
