import Fastify from "fastify"
import { databasePlugin } from "./core/database/database.plugin"
import { postsRoutes } from "./modules/posts/posts.routes"
import { reelsRoutes } from "./modules/reels/reels.routes"
import { taggedRoutes } from "./modules/tagged/tagged.routes"
import { highlightsRoutes } from "./modules/highlights/highlights.routes"
import multipart from "@fastify/multipart"
import fastifyStatic from "@fastify/static"
import path from "path"
import dotenv from "dotenv"

dotenv.config()

const fastify = Fastify({
    logger: true,
})

// Register static file serving
fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), "public"),
    prefix: "/",
})

// Register multipart plugin
fastify.register(multipart, {
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
})

// Register database plugin
fastify.register(databasePlugin)
// Register posts routes
fastify.register(postsRoutes)
// Register reels routes
fastify.register(reelsRoutes)
// Register tagged posts routes
fastify.register(taggedRoutes)
// Register highlights routes
fastify.register(highlightsRoutes)

// Declare a default route
fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" })
})

const port = 3000

fastify.listen({ port }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})

export default fastify
