import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { taggedService } from "./tagged.service"

const taggedRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = taggedService(fastify)

    // fastify.post<{ Body: CreatePostBody }>("/posts", async (request, reply) => {
    //     const newPost = await service.create(request.body)

    //     // Return a 201 Created status code with the new post object
    //     return reply.code(201).send(newPost)
    // })

    fastify.get("/tagged/grid", async (request, reply) => {
        const allTags = await service.getAll()

        // Return a 200 OK status code with all posts
        return reply.code(200).send(allTags)
    })
}

export { taggedRoutes }
