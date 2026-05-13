import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { usePostContactUs } from '@/api/api-contact'

import type { ContactMessage } from '@/models/ContactMessage'

/*
 * Field validation.
 */
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

const defaultValues/*: FormSchema */ = {
    name: '', email: '', message: ''
}

/*
 * - - - - - - - - - - - - - - -
 *
 * Form for the ContactCard component.
 *
 * - - - - - - - - - - - - - - -
 */
export const useContactForm = () => {

    const form = useForm<z.infer<FormSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const { contactUs, pending, success, error } = usePostContactUs()

    const onSubmit = (data: z.infer<FormSchema>) => {
        console.info(`[useContactForm] Submit: ${JSON.stringify(data, null, 2)}`)
        const message = data as ContactMessage
        contactUs(message)
    }

    // - - - - - Return - - - - - //

    return {
        form,
        onSubmit,
        pending,
        success,
        error
    }
}
