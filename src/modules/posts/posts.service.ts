import type { FastifyInstance } from "fastify"

// Define a type for the data needed to create a post
type CreatePostData = {
    img_url: string
    caption: string
}

export const postsService = (fastify: FastifyInstance) => {
    return {
        create: async (postData: CreatePostData) => {
            fastify.log.info(`Creating a new post`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const post = fastify.transactions.posts.create(postData)
            return post
        },
    }
}
