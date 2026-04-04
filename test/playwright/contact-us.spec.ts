import { expect, test } from '@playwright/test'

/*
 * Playwright Tests
 *   Testing the 'Contact Us' form, fill-in the name, etc. & click Send.
 */

test('Find ContactCard component by data-id', async ({ page }) => {
    await page.goto('.')

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByTestId(/ContactCard/)).toBeVisible();
})

test('Card has the expected header', async ({ page }) => {
    await page.goto('.')

    const header = page.getByRole('heading', { name: 'Contact us' })

    await expect(header).toBeVisible();
})

test('Fill the form inputs and send', async ({ page }) => {
    await page.goto('.')

    await page.getByLabel('Your Name').fill('Test User')

    await page.getByLabel('Your Email').fill('testuser@karasu.co.uk')

    await page.getByPlaceholder('The message you want to send')    // Message
        .fill('End-to-end test of the Contact Us form')

    const button = page.getByRole('button', { name: 'Send' })

    await expect(button).toBeVisible()
    await button.click()
})
