import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const userService = { getAll, create }

export default userService