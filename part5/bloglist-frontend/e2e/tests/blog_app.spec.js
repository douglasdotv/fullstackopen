const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog, likeBlog, removeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await request.post('/api/users', {
      data: {
        name: 'Douglas Vieira',
        username: 'douglas',
        password: '123456',
      },
    })

    await request.post('/api/users', {
      data: {
        name: 'Another User',
        username: 'another',
        password: 'password',
      },
    })

    await page.goto('/')
  })

  test('Should display login form by default', async ({ page }) => {
    const usernameInput = page.getByLabel('Username')
    const passwordInput = page.getByLabel('Password')
    const loginButton = page.getByRole('button', { name: 'Login' })

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

      const errorDiv = page.locator('.notification.error')
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

    test('Should only show remove button to the user who created the blog post', async ({
      page,
    }) => {
      await createBlog(
        page,
        'Remove Button Visibility',
        'Douglas',
        'http://ok.com'
      )

      const blogPostContainer = page.locator('.blog-post-container', {
        hasText: 'Remove Button Visibility',
      })
      await blogPostContainer.getByRole('button', { name: 'View' }).click()
      const removeButton = blogPostContainer.getByRole('button', {
        name: 'Remove',
      })
      await expect(removeButton).toBeVisible()

      await page.getByRole('button', { name: 'Logout' }).click()
      await login(page, 'another', 'password')

      await blogPostContainer.getByRole('button', { name: 'View' }).click()
      await expect(removeButton).not.toBeVisible()
    })

    test('Should display blog posts sorted by amount of likes in descending order', async ({
      page,
    }) => {
      await createBlog(page, 'With 1 like', 'Author1', 'http://like1.com')
      await createBlog(page, 'With 3 likes', 'Author3', 'http://like3.com')
      await createBlog(page, 'With 5 likes', 'Author5', 'http://like5.com')

      await likeBlog(page, 'With 1 like', 1)
      await likeBlog(page, 'With 3 likes', 3)
      await likeBlog(page, 'With 5 likes', 5)

      await expect(
        page
          .locator('.blog-post-container', { hasText: 'With 5 likes' })
          .locator('p', { hasText: 'Likes: 5' })
      ).toBeVisible()

      await expect(
        page
          .locator('.blog-post-container', { hasText: 'With 3 likes' })
          .locator('p', { hasText: 'Likes: 3' })
      ).toBeVisible()

      await expect(
        page
          .locator('.blog-post-container', { hasText: 'With 1 like' })
          .locator('p', { hasText: 'Likes: 1' })
      ).toBeVisible()

      const blogTitles = await page
        .locator('.blog-post-title')
        .allTextContents()

      expect(blogTitles).toEqual([
        'With 5 likes',
        'With 3 likes',
        'With 1 like',
      ])
    })
  })
})
