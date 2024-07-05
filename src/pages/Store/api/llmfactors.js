import client from './client'

const getAllLlmfactors = () => client.get('/llmfactors')

const getSpecificLlmfactor = (id) => client.get(`/llmfactors/${id}`)

const createNewLlmfactor = (body) => client.post(`/llmfactors`, body)

const updateLlmfactor = (id, body) => client.put(`/llmfactors/${id}`, body)

const deleteLlmfactor = (id) => client.delete(`/llmfactors/${id}`)

export default {
    getAllLlmfactors,
    getSpecificLlmfactor,
    createNewLlmfactor,
    updateLlmfactor,
    deleteLlmfactor
}
