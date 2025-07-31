import type { FastifyInstance } from "fastify"

export const highlightsService = (fastify: FastifyInstance) => {
    return {
        getAll: async () => {
            fastify.log.info(`Getting all highlights`)
            const highlights = fastify.transactions.highlights.getAll()
            return highlights
        },
        getById: async (id: number) => {
            fastify.log.info(`Getting a highlight by id: ${id}`)
            const highlight = fastify.transactions.highlights.getById(id)
            return highlight
        },
    }
}
