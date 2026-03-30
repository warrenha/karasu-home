import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import Card from './ui-simple/Card'

import { usePostContactUs } from '@/api/api-contact'

import type { ContactMessage } from '@/models/ContactMessage'

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

    const { contactUs, pending, success, error } = usePostContactUs()
    console.info(`ContactCard pending=${pending}, success=${success}, error=${error}`)

    const form = useForm<z.infer<FormSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const onSubmit = (data: z.infer<FormSchema>) => {
        console.info(`SUBMIT\n${JSON.stringify(data, null, 2)}`)
        const message = data as ContactMessage;
        contactUs(message)
    }

    // - - - - - Render - - - - - //

    const renderName = ({ field, fieldState }: any) => (
        <Field data-invalid={fieldState.invalid} className="gap-[5px]" >
            <FieldLabel htmlFor="form-contact-name" className="text-base">
                Your Name
            </FieldLabel>
            <Input
                {...field}
                id="form-contact-name"
                className="text-base md:text-base ring-red-400 bg-[rgb(247,247,247)]"
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
                className="text-base md:text-base bg-[rgb(247,247,247)]"
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
                    className="min-h-24 resize-none text-base md:text-base rounded-[5px] bg-[rgb(247,247,247)]"
                    placeholder="The message you want to send"
                    rows={6}
                    aria-invalid={fieldState.invalid} />
                <InputGroupAddon align="block-end"className="rounded-[5px] bg-[rgb(247,247,247)]">
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
                className="text-base cursor-pointer px-3 bg-[rgb(247,247,247)]" >
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
