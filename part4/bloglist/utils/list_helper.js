const _ = require('lodash')

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, { likes }) => sum + likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
  return blogs.find((blog) => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCounts = _.countBy(blogs, 'author')

  const topAuthor = _.maxBy(
    Object.keys(authorCounts),
    (author) => authorCounts[author]
  )

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
