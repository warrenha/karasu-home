import Card from './ui-simple/Card'

const Title = 'Contact us'

/*
 * - - - - - - - - - -
 *
 * Form for sending a contact message.
 *
 * - - - - - - - - - -
 */
const ContactCard = () => {
    return (
        <Card data-id="ContactCard" title={Title} >
            <div className="flex flex-col items-start" >
                <div>Your Email</div>
                <div>Subject</div>
                <div>Message</div>
            </div>
        </Card>
    )
}

export default ContactCard
