import client from './client'

const getAllAgents = () => client.get('/agents')

const getSpecificAgent = (id) => client.get(`/agents/${id}`)

const createNewAgent = (body) => client.post(`/agents`, body)

const updateAgent = (id, body) => client.put(`/agents/${id}`, body)

const deleteAgent = (id) => client.delete(`/agents/${id}`)

export default {
    getAllAgents,
    getSpecificAgent,
    createNewAgent,
    updateAgent,
    deleteAgent
}
