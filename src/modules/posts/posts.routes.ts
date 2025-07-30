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

    fastify.get("/posts", async (request, reply) => {
        const allPosts = await service.getAll()

        // Return a 200 OK status code with all posts
        return reply.code(200).send(allPosts)
    })
}

export { postsRoutes }
