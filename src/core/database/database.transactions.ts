import type { Database } from "better-sqlite3"

// This factory function creates and returns our transaction helpers.
export const createTransactionHelpers = (db: Database) => {
    // We use prepared statements for security and performance.
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare(
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),
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

    const reelStatements = {
        getAllReels: db.prepare("SELECT * FROM reels"),
    }

    const reels = {
        getAll: () => reelStatements.getAllReels.all(),
    }

    const taggedStatements = {
        getAllTaggedPosts: db.prepare("SELECT * FROM tagged_posts"),
    }

    const tagged = {
        getAll: () => taggedStatements.getAllTaggedPosts.all(),
    }

    const highlightsStatements = {
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
        getHighlightsById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
    }

    const highlights = {
        getAll: () => {
            return highlightsStatements.getAllHighlights.all()
        },
        getById: (id: number) => {
            return highlightsStatements.getHighlightsById.get(id)
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
