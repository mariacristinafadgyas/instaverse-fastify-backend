import Fastify from "fastify"
import { taggedRoutes } from "./tagged.routes"
import { mock } from "node:test"

describe("GET  /tagged/grid", () => {
    it("should return a list of tagged posts with a 200 status code", async () => {
        const app = Fastify()
        const mockTaggs = [
            {
                id: 1,
                img_url: "http://example.com/image1.jpg",
                caption: "First post",
                created_at: "2025-07-30T13:00:00.000Z",
                tagged_by: "Alice",
            },
            {
                id: 2,
                img_url: "http://example.com/image2.jpg",
                caption: "Second post",
                created_at: "2025-07-30T13:01:00.000Z",
                tagged_by: "MariaB",
            },
        ]

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn(),
            },
            reels: {
                getAll: jest.fn(),
            },
            tagged: {
                getAll: jest.fn().mockReturnValue(mockTaggs),
            },
        })

        app.register(taggedRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/tagged/grid",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockTaggs)
    })
})
