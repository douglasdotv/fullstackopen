import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (error) {
        console.error('Error while fetching resources:', error)
      }
    }
    fetchResources()
  }, [baseUrl])

  const create = async (newResource) => {
    try {
      const response = await axios.post(baseUrl, newResource)
      const createdResource = response.data
      setResources(resources.concat(createdResource))
    } catch (error) {
      console.error('Error while creating resource:', error)
    }
  }

  const service = {
    create,
  }

  return [resources, service]
}

export default useResource
