import { z } from "zod"

export const highlightSchema = z.object({
    id: z.number(),
    title: z.string(),
    cover_image_url: z.string().url(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime().optional(),
})

export type Highlight = z.infer<typeof highlightSchema>
