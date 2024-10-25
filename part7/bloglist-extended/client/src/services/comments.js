import axios from 'axios'

const baseUrl = '/api/blogs'

export const getAll = async blogId => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

export const create = async (blogId, text) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { text })
  return response.data
}
