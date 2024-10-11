const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Douglas Vieira',
        username: 'douglas',
        password: '123456',
      },
    })

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

  describe('Login', () => {
    test('Should succeed with correct credentials', async ({ page }) => {
      await page.getByLabel('Username').fill('douglas')
      await page.getByLabel('Password').fill('123456')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Douglas Vieira logged in!')).toBeVisible()
    })

    test('Should fail with wrong credentials', async ({ page }) => {
      await page.getByLabel('Username').fill('douglas')
      await page.getByLabel('Password').fill('wrongpassword')
      await page.getByRole('button', { name: 'Login' }).click()

      const errorDiv = await page.locator('.notification.error')
      await expect(errorDiv).toContainText('Invalid username or password')
      await expect(
        page.getByText('Douglas Vieira logged in!')
      ).not.toBeVisible()
    })
  })
})
