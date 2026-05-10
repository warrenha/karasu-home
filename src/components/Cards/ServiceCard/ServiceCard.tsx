import { Card } from '@/components/ui/simple'
import { serviceTexts } from './serviceTexts'
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
        <Card data-id="ServiceCard" title="Services" >
            { serviceTexts.map((line, index) => (
                <BulletLine line={line} key={`line-${index}`} />
            ))}
        </Card>
    )
}
