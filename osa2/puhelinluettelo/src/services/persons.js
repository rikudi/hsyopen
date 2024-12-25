import axios from 'axios'
const baseUrl = '/api/persons'

// for getting all entries
 const getAll = () => {
  return axios.get(baseUrl)
}
// for creating new entries
const create = newObject => {
  return axios.post(baseUrl, newObject)
}
// for updating existing entries
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}
// for deleting entries
const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  remove: remove 
}