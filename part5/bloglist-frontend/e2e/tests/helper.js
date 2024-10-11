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

const likeBlog = async (page, title) => {
  const blogPostContainer = page.locator('.blog-post-container', {
    hasText: title,
  })
  await blogPostContainer.getByRole('button', { name: 'View' }).click()
  await blogPostContainer.getByRole('button', { name: 'Like' }).click()
  return blogPostContainer
}

export { login, createBlog, likeBlog }
