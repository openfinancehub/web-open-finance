import client from './client'

const getAllTemplatesFromMarketplaces = () => client.get('/marketplaces/templates')

export default {
    getAllTemplatesFromMarketplaces
}