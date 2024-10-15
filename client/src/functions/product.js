import axios from 'axios'


export const remove = async (id) =>
    await axios.delete(process.env.REACT_APP_API + '/product/' + id)

export const create = async (data) =>
    await axios.post(process.env.REACT_APP_API + '/product', data)
    
export const getdata = async () => {
    return await axios.get(process.env.REACT_APP_API + '/product')
}
export const read = async (id) => {
    return await axios.get(process.env.REACT_APP_API + '/product/' + id)
}
export const update = async (id, data) => {
    return await axios.put(process.env.REACT_APP_API + '/product/' + id, data)
}