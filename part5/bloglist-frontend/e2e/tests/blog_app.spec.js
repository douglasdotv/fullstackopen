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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('Username').fill('douglas')
      await page.getByLabel('Password').fill('123456')
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('Should successfully create a new blog post', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog post' }).click()
      await page.getByLabel('Title').fill('My New Blog')
      await page.getByLabel('Author').fill('Douglas Vieira')
      await page.getByLabel('URL').fill('http://newblog.com')
      await page.getByRole('button', { name: 'Create' }).click()

      const title = page.locator('.blog-post-title', {
        hasText: 'My New Blog',
      })
      const author = page.locator('.blog-post-author', {
        hasText: 'Douglas Vieira',
      })

      await expect(title).toBeVisible()
      await expect(author).toBeVisible()
    })

    test('Should successfully like a blog post', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog post' }).click()
      await page.getByLabel('Title').fill('Blog to Like')
      await page.getByLabel('Author').fill('Author')
      await page.getByLabel('URL').fill('http://likethisblog.com')
      await page.getByRole('button', { name: 'Create' }).click()

      const blogPostContainer = page.locator('.blog-post-container', {
        hasText: 'Blog to Like',
      })

      await blogPostContainer.getByRole('button', { name: 'View' }).click()
      await blogPostContainer.getByRole('button', { name: 'Like' }).click()

      const likesText = blogPostContainer.locator('p', { hasText: 'Likes: 1' })
      await expect(likesText).toBeVisible()
    })
  })
})
