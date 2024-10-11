import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: '123',
  title: 'A Test Blog',
  author: 'Test Author',
  url: 'http://testurl.com',
  likes: 5,
  user: {
    name: 'Test User',
  },
}

const mockOnLike = vi.fn()
const mockOnRemove = vi.fn()

test('Should render blog post title and author, but does not render url or likes by default', () => {
  render(<Blog blog={blog} onLike={mockOnLike} onRemove={mockOnRemove} />)

  const titleElement = screen.getByText('A Test Blog')
  const authorElement = screen.getByText('by Test Author')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()

  const urlElement = screen.queryByText('http://testurl.com')
  const likesElement = screen.queryByText('Likes: 5')

  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('Should show blog post url and likes when the view button is clicked', async () => {
  render(<Blog blog={blog} onLike={mockOnLike} onRemove={mockOnRemove} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const urlElement = screen.getByText('http://testurl.com')
  const likesElement = screen.getByText('Likes: 5')

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})
