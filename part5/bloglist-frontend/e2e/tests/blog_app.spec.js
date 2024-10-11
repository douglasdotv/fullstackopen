const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog, likeBlog, removeBlog } = require('./helper')

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
      await login(page, 'douglas', '123456')

      await expect(page.getByText('Douglas Vieira logged in!')).toBeVisible()
    })

    test('Should fail with wrong credentials', async ({ page }) => {
      await login(page, 'douglas', 'wrongpassword')

      const errorDiv = await page.locator('.notification.error')
      await expect(errorDiv).toContainText('Invalid username or password')
      await expect(
        page.getByText('Douglas Vieira logged in!')
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'douglas', '123456')
    })

    test('Should successfully create a new blog post', async ({ page }) => {
      await createBlog(
        page,
        'My New Blog',
        'Douglas Vieira',
        'http://newblog.com'
      )

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
      await createBlog(
        page,
        'Blog to Like',
        'Author',
        'http://likethisblog.com'
      )
      const likedBlogPostContainer = await likeBlog(page, 'Blog to Like')

      const likesText = likedBlogPostContainer.locator('p', {
        hasText: 'Likes: 1',
      })
      await expect(likesText).toBeVisible()
    })

    test('Should allow the user who created the blog post to remove it', async ({
      page,
    }) => {
      await createBlog(
        page,
        'Blog to Remove',
        'Author',
        'http://removethisblog.com'
      )
      await removeBlog(page, 'Blog to Remove')

      const blogPostContainer = page.locator('.blog-post-container', {
        hasText: 'Blog to Remove',
      })
      await expect(blogPostContainer).not.toBeVisible()
    })
  })
})
