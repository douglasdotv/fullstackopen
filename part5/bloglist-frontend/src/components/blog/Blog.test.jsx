import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Should render blog post title and author, but does not render url or likes by default', () => {
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
