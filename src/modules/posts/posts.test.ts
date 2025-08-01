import Fastify from "fastify"
import { postsRoutes } from "./posts.routes"

// Mock the file storage service
jest.mock("../../common/file-storage.service", () => ({
    fileStorageService: {
        saveImage: jest.fn().mockResolvedValue("/uploads/test-image.jpg"),
    },
}))

describe("POST GET /posts", () => {
    it("should create a new post and return it with a 201 status code", async () => {
        const app = Fastify()

        // Register multipart support
        await app.register(require("@fastify/multipart"))

        const newPostPayload = {
            img_url: "/uploads/test-image.jpg",
            caption: "A brand new post from our test!",
            created_at: "2025-07-30T13:00:00.000Z",
        }

        const createdPost = { ...newPostPayload, id: 1 }

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn().mockReturnValue(createdPost),
            },
            reels: {
                getAll: jest.fn(),
            },
            tagged: {
                getAll: jest.fn(),
            },
            highlights: {
                getAll: jest.fn(),
                getById: jest.fn(),
            },
        })

        app.register(postsRoutes)

        // Create multipart payload manually
        const boundary = "----formdata-test-boundary"
        const payload = [
            `--${boundary}`,
            'Content-Disposition: form-data; name="caption"',
            "",
            "A brand new post from our test!",
            `--${boundary}`,
            'Content-Disposition: form-data; name="image"; filename="test-image.jpg"',
            "Content-Type: image/jpeg",
            "",
            "fake image data",
            `--${boundary}--`,
            "",
        ].join("\r\n")

        const response = await app.inject({
            method: "POST",
            url: "/posts",
            payload: payload,
            headers: {
                "content-type": `multipart/form-data; boundary=${boundary}`,
            },
        })

        expect(response.statusCode).toBe(201)
        expect(JSON.parse(response.payload)).toEqual(createdPost)
    })

    it("should get all posts and return them with a 200 status code", async () => {
        const app = Fastify()

        const mockPosts = [
            {
                id: 1,
                img_url: "http://example.com/image1.jpg",
                caption: "First post",
                created_at: "2025-07-30T13:00:00.000Z",
            },
            {
                id: 2,
                img_url: "http://example.com/image2.jpg",
                caption: "Second post",
                created_at: "2025-07-30T13:01:00.000Z",
            },
        ]

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn().mockReturnValue(mockPosts),
                create: jest.fn(),
            },
            reels: {
                getAll: jest.fn(),
            },
            tagged: {
                getAll: jest.fn(),
            },
            highlights: {
                getAll: jest.fn(),
                getById: jest.fn(),
            },
        })

        app.register(postsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/posts",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockPosts)
    })
})
