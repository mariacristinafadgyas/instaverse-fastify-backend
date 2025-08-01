import type { Database } from "better-sqlite3"

// This factory function creates and returns our transaction helpers.
export const createTransactionHelpers = (db: Database) => {
    // We use prepared statements for security and performance.
    const statements = {
        // Posts
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare(
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),

        // Reels
        getAllReels: db.prepare("SELECT * FROM reels"),

        // Tagged
        getAllTaggedPosts: db.prepare("SELECT * FROM tagged_posts"),

        // Highlights
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
        getHighlightsById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
    }

    const posts = {
        getById: (id: number) => {
            return statements.getPostById.get(id)
        },
        getAll: () => {
            return statements.getAllPosts.all()
        },
        create: (data: { img_url: string; caption: string }) => {
            return statements.createPost.get(data)
        },
    }

    const reels = {
        getAll: () => statements.getAllReels.all(),
    }

    const tagged = {
        getAll: () => statements.getAllTaggedPosts.all(),
    }

    const highlights = {
        getAll: () => {
            return statements.getAllHighlights.all()
        },
        getById: (id: number) => {
            return statements.getHighlightsById.get(id)
        },
    }

    return {
        posts,
        reels,
        tagged,
        highlights,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
