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

    const reelStatements = {
        getAllReels: db.prepare("SELECT * FROM reels"),
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
        getAll: () => reelStatements.getAllReels.all(),
    }

    return {
        posts,
        reels,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
