import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { reelsService } from "./reels.service"

// // Define a type for the request body
// type CreatePostBody = {
//     img_url: string
//     caption: string
// }

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = reelsService(fastify)

    // fastify.post<{ Body: CreatePostBody }>("/posts", async (request, reply) => {
    //     const newPost = await service.create(request.body)

    //     // Return a 201 Created status code with the new post object
    //     return reply.code(201).send(newPost)
    // })

    fastify.get("/reels/grid", async (request, reply) => {
        const allReels = await service.getAll()

        // Return a 200 OK status code with all posts
        return reply.code(200).send(allReels)
    })
}

export { reelsRoutes }
