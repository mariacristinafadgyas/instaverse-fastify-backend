import Fastify from "fastify"
import { highlightsRoutes } from "./highlights.routes"

describe("GET  /highlights", () => {
    it("should return a list of highlights with a 200 status code", async () => {
        const app = Fastify()
        const mockHighlights = [
            {
                id: 1,
                title: "Summer Vibes",
                cover_image_url: "http://example.com/highlight1.jpg",
                created_at: "2025-07-30T13:00:00.000Z",
            },
            {
                id: 2,
                title: "City Lights",
                cover_image_url: "http://example.com/highlight2.jpg",
                created_at: "2025-06-12T10:30:00.000Z",
                updated_at: "2025-07-01T14:45:00.000Z",
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
                getAll: jest.fn(),
            },
            highlights: {
                getAll: jest.fn().mockReturnValue(mockHighlights),
            },
        })

        app.register(highlightsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/highlights",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockHighlights)
    })
})
describe("GET  /highlights/:id", () => {
    it("should return a single highlight by ID with a 200 status code", async () => {
        const app = Fastify()
        const mockHighlights = [
            {
                id: 1,
                title: "Summer Vibes",
                cover_image_url: "http://example.com/highlight1.jpg",
                created_at: "2025-07-30T13:00:00.000Z",
            },
            {
                id: 2,
                title: "City Lights",
                cover_image_url: "http://example.com/highlight2.jpg",
                created_at: "2025-06-12T10:30:00.000Z",
                updated_at: "2025-07-01T14:45:00.000Z",
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
                getAll: jest.fn(),
            },
            highlights: {
                getById: jest.fn().mockReturnValue(mockHighlights),
            },
        })

        app.register(highlightsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/highlights/2",
        })

        expect(JSON.parse(response.payload)).toHaveBeenCalledWith(2)
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockHighlights)
    })
})
