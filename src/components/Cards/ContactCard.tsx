import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Card, LabelIcon, SmileIcon } from '@/components/ui/simple'

import { useContactForm } from './useContactForm'

const Title = 'Contact us'

/*
 * - - - - - - - - - -
 *
 * Form for sending a contact message.
 *
 * - - - - - - - - - -
 */
export const ContactCard = () => {

    const {
        form, onSubmit,
        pending, success, error  // submit status
    } = useContactForm()

    const disabled = success || error

    // - - - - - Render - - - - - //

    const statusText = error ? 'Error!' : pending ? 'Submitting...' : success ? (
        <LabelIcon 
            label="Sent! Thank you for your message"
            icon={SmileIcon} />
    ) : ''

    const renderName = ({ field, fieldState }: any) => (
        <Field data-invalid={fieldState.invalid} className="gap-[5px]">
            <FieldLabel htmlFor="form-contact-name" className="text-base">
                Your Name
            </FieldLabel>
            <Input
                {...field}
                id="form-contact-name"
                className="text-base md:text-base ring-red-400 bg-[rgb(247,247,247)]"
                aria-invalid={fieldState.invalid}
                placeholder="Please enter your name"
                autoComplete="off"
                disabled={disabled} />
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
                autoComplete="off"
                disabled={disabled} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )

    const renderMessage = ({ field, fieldState }: any) => (
        <Field data-invalid={fieldState.invalid} className="gap-[5px]">
            <FieldLabel htmlFor="form-contact-messsage" className="text-base">
                Message
            </FieldLabel>
            <InputGroup>
                <InputGroupTextarea
                    {...field}
                    id="form-contact-message"
                    className="min-h-24 resize-none text-base md:text-base rounded-[5px] bg-[rgb(247,247,247)] disabled:cursor-not-allowed"
                    placeholder="The message you want to send"
                    rows={6}
                    aria-invalid={fieldState.invalid} 
                    disabled={disabled} />
                <InputGroupAddon align="block-end" className="rounded-[5px] bg-[rgb(247,247,247)]">
                    <InputGroupText className="tabular-nums">
                        {field.value.length}/1000 characters
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )

    const renderButtons = () => (
        <Field orientation="horizontal" className="gap-3">
            <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={disabled}
                className="text-base cursor-pointer px-3 bg-[rgb(247,247,247)]">
                Reset
            </Button>
            <Button
                type="submit"
                form="form-contact"
                disabled={disabled}
                className="text-base cursor-pointer px-3 border-0">
                Send
            </Button>
            <div>{statusText}</div>
        </Field>
    )

    const disabledC = disabled ? 'bg-[#86cbd5]' : ''

    return (
        <Card data-id="ContactCard" title={Title} className={disabledC}>
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
                {renderButtons()}
            </div>
        </Card>
    )
}
