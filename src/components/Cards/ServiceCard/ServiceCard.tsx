import { Card } from '@/components/ui/simple'
import { serviceTexts } from './ServiceData'
import { BulletLine } from '../ContactCard/BulletLine'

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

