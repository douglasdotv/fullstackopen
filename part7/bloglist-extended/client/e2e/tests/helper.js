const login = async (page, username, password) => {
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New blog post' }).click()
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('URL').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
  const blogPostContainer = page.locator('.blog-post-container', {
    hasText: title,
  })
  await blogPostContainer.getByText(title).waitFor()
}

const likeBlog = async (page, title, likes = 1) => {
  const blogPostContainer = page.locator('.blog-post-container', {
    hasText: title,
  })
  await blogPostContainer.getByRole('button', { name: 'View' }).click()
  for (let i = 1; i <= likes; ++i) {
    await blogPostContainer.getByRole('button', { name: 'Like' }).click()
    await blogPostContainer
      .locator('p', { hasText: `Likes: ${i}` })
      .waitFor({ timeout: 5000 })
  }
  return blogPostContainer
}

const removeBlog = async (page, title) => {
  const blogPostContainer = page.locator('.blog-post-container', {
    hasText: title,
  })
  await blogPostContainer.getByRole('button', { name: 'View' }).click()
  page.on('dialog', async (dialog) => {
    await dialog.accept()
  })
  await blogPostContainer.getByRole('button', { name: 'Remove' }).click()
}

export { login, createBlog, likeBlog, removeBlog }
