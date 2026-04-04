import { expect, test } from '@playwright/test'

test('Has title', async ({ page }) => {
    await page.goto('.')  // baseURL of dev server

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Karasu/)
})

test('Find App component by data-id', async ({ page }) => {
    await page.goto('.')

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByTestId('App')).toBeVisible();
})

test('Page has expected title', async ({ page }) => {
    await page.goto('.')

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Karasu Software' })).toBeVisible();
})
