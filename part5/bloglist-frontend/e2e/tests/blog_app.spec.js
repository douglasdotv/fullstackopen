const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Should display login form by default', async ({ page }) => {
    const usernameInput = await page.getByLabel('Username')
    const passwordInput = await page.getByLabel('Password')
    const loginButton = await page.getByRole('button', { name: 'Login' })

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })
})
