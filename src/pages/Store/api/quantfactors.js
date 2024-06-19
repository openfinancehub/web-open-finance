import client from './client'

const getAllQuantfactors = () => client.get('/quantfactors')

const getSpecificQuantfactor = (id) => client.get(`/quantfactors/${id}`)

const createNewQuantfactor = (body) => client.post(`/quantfactors`, body)

const updateQuantfactor = (id, body) => client.put(`/quantfactors/${id}`, body)

const deleteQuantfactor = (id) => client.delete(`/quantfactors/${id}`)

export default {
    getAllQuantfactors,
    getSpecificQuantfactor,
    createNewQuantfactor,
    updateQuantfactor,
    deleteQuantfactor
}
