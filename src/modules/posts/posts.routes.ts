import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { postsService } from "./posts.service"

// Define a type for the request body
type CreatePostBody = {
    img_url: string
    caption: string
}

const postsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = postsService(fastify)

    fastify.post<{ Body: CreatePostBody }>("/posts", async (request, reply) => {
        const newPost = await service.create(request.body)

        // Return a 201 Created status code with the new post object
        return reply.code(201).send(newPost)
    })
}

export { postsRoutes }
