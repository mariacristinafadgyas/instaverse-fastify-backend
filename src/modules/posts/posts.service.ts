import type { FastifyInstance } from "fastify"
import { fileStorageService } from "../../common/file-storage.service"

// Define a type for the data needed to create a post
type CreatePostData = {
    img_url: string // This will now use the self storage
    caption: string
}

type CreatePostServiceArgs = {
    caption: string
    imageFile?: { buffer: Buffer; filename: string } // New optional image file
}

export const postsService = (fastify: FastifyInstance) => {
    return {
        create: async (data: CreatePostServiceArgs) => {
            fastify.log.info(`Creating a new post`)

            let img_url = data.caption // Fallback if no image, or placeholder

            if (data.imageFile) {
                // If an image is provided, save it and get the URL
                img_url = await fileStorageService.saveImage(
                    data.imageFile.buffer,
                    data.imageFile.filename
                )
            }

            const post = fastify.transactions.posts.create({
                img_url,
                caption: data.caption,
            })
            return post
        },
        getAll: async () => {
            fastify.log.info(`Getting all posts`)
            const posts = fastify.transactions.posts.getAll()
            return posts
        },
    }
}
