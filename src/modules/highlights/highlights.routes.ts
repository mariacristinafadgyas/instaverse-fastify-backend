import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { highlightsService } from "./highlights.service"

const highlightsRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = highlightsService(fastify)

    fastify.get("/highlights", async (request, reply) => {
        const allHighlights = await service.getAll()

        // Return a 200 OK status code with all highlights
        return reply.code(200).send(allHighlights)
    })
    fastify.get<{
        Params: { id: string }
    }>("/highlights/:id", async (request, reply) => {
        const { id } = request.params as { id: string }
        const numericId = Number(id)

        if (isNaN(numericId)) {
            return reply
                .code(400)
                .send({ error: "Invalid ID format. Must be a number." })
        }

        const highlightById = await service.getById(numericId)

        // Handle case where highlight is not found
        if (!highlightById) {
            return reply.code(404).send({ error: "Highlight not found" })
        }

        // Return a 200 OK status code for a highlight by id
        return reply.code(200).send(highlightById)
    })
}

export { highlightsRoutes }
