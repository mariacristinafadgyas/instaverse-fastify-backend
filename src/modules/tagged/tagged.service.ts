import type { FastifyInstance } from "fastify"

export const taggedService = (fastify: FastifyInstance) => {
    return {
        // create: async (postData: CreatePostData) => {
        //     fastify.log.info(`Creating a new post`)
        //     // This will use the MOCK `transactions` in the test,
        //     // and the REAL `transactions` in the live application.
        //     const post = fastify.transactions.posts.create(postData)
        //     return post
        // },
        getAll: async () => {
            fastify.log.info(`Getting all taggs`)
            const taggs = fastify.transactions.tagged.getAll()
            return taggs
        },
    }
}
