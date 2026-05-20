import { Card } from '@/components/ui/simple'
import { serviceTexts } from './serviceTexts'
import { BulletList } from './BulletList'

/*
 * - - - - -  - - - - -  - - - - -
 *
 * List of services provided.
 *
 * - - - - -  - - - - -  - - - - -
 */
export const ServiceCard = () => {
    return (
        <Card data-id="ServiceCard"
            title="Services" >
            <BulletList lines={serviceTexts} />
        </Card>
    )
}
