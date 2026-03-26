import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import Card from './ui-simple/Card'

const Title = 'Contact us'

const formSchema = z.object({
    name: z.string()
        .min(1, 'Name must be at least 1 character')
        .max(50, 'Name must be at most 50 characters'),
    email: z.email()
        .min(5, 'Name must be at least 5 characters')
        .max(50, 'Name must be at most 50 characters'),
    message: z.string()
        .min(5, 'Message must be at least 5 characters')
        .max(1000, 'Message must be at most 1000 characters')
})
type FormSchema = typeof formSchema

const defaultValues /*: FormSchema*/ = {
    name: '',
    email: '',
    message: ''
}

/*
 * - - - - - - - - - -
 *
 * Form for sending a contact message.
 *
 * - - - - - - - - - -
 */
const ContactCard = () => {
    /* console.info('Contact Card')
    try {
        const input = { name: 'Warren', email: 'hello@karasu.co.uk', message: 'Blah blah' }
        const data = formSchema.parse(input)
        console.info(`ZOD:\n${JSON.stringify(data)}`)
    } catch (e: any) {
        console.warn('ERROR IN ContactCard')
        console.warn(e)
    }*/

    const form = useForm<z.infer<FormSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const onSubmit = (data: z.infer<FormSchema>) => {
        console.info('SUBMIT')
    }

    const renderName = ({ field, fieldState }: any) => (
        <Field data-invalid={fieldState.invalid} className="gap-[5px]" >
            <FieldLabel htmlFor="form-contact-name" className="text-base">
                Your Name
            </FieldLabel>
            <Input
                {...field}
                id="form-contact-name"
                className="text-base md:text-base ring-red-400"
                aria-invalid={fieldState.invalid}
                placeholder="Please enter your name"
                autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )

    const renderEmail = ({ field, fieldState }: any) => (
        <Field data-invalid={fieldState.invalid} className="gap-[5px]">
            <FieldLabel htmlFor="form-contact-email" className="text-base">
                Your Email
            </FieldLabel>
            <Input
                {...field}
                id="form-contact-email"
                className="text-base md:text-base"
                aria-invalid={fieldState.invalid}
                placeholder="Please enter your email address"
                autoComplete="off" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )

    const renderMessage = ({ field, fieldState }: any) => (
        <Field data-invalid={fieldState.invalid} className="gap-[5px]" >
            <FieldLabel htmlFor="form-contact-messsage" className="text-base">
                Message
            </FieldLabel>
            <InputGroup>
                <InputGroupTextarea
                    {...field}
                    id="form-contact-message"
                    className="min-h-24 resize-none text-base md:text-base"
                    placeholder="The message you want to send"
                    rows={6}
                    aria-invalid={fieldState.invalid} />
                <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                        {field.value.length}/1000 characters
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )

    const renderButtons = () => (
        <Field orientation="horizontal" className="gap-3" >
            <Button type="button" variant="outline" onClick={() => form.reset()}
                className="text-base cursor-pointer px-3" >
                Reset
            </Button>
            <Button type="submit" form="form-contact"
                className="text-base cursor-pointer px-3 border-0" >
                Send
            </Button>
        </Field>
    )

    return (
        <Card data-id="ContactCard" title={Title}>
            <div className="flex flex-col gap-5">
                <form id="form-contact" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={renderName} />
                        <Controller
                            name="email"
                            control={form.control}
                            render={renderEmail} />
                        <Controller
                            name="message"
                            control={form.control}
                            render={renderMessage} />
                    </FieldGroup>
                </form>
                <div>
                    {renderButtons()}
                </div>
            </div>
        </Card>
    )
}

export default ContactCard
