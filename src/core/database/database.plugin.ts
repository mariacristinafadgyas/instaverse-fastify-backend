import type { FastifyInstance } from "fastify"
import fp from "fastify-plugin"
import Database from "better-sqlite3"
import {
    createTransactionHelpers,
    type TransactionHelpers,
} from "./database.transactions"

declare module "fastify" {
    interface FastifyInstance {
        db: Database.Database
        transactions: TransactionHelpers
    }
}

async function databasePluginHelper(fastify: FastifyInstance) {
    const dbPath = process.env.DATABASE_PATH || "./database.db"
    const db = new Database(dbPath)

    fastify.log.info("SQLite database connection established.")

    // Create a simple table for testing if it doesn't exist
    db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img_url TEXT NOT NULL,
    caption TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)
    db.exec(`
      CREATE TABLE IF NOT EXISTS reels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        video_url TEXT NOT NULL,
        thumbnail_url TEXT NOT NULL,
        caption TEXT,
        views INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `)

    db.exec(`
      CREATE TABLE IF NOT EXISTS tagged_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      tagged_by TEXT NOT NULL
      );
    `)

    db.exec(`
      CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      cover_image_url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `)

    const transactions = createTransactionHelpers(db)

    fastify.decorate("db", db)
    fastify.decorate("transactions", transactions)

    fastify.addHook("onClose", (instance, done) => {
        instance.db.close()
        instance.log.info("SQLite database connection closed.")
        done()
    })
}

export const databasePlugin = fp(databasePluginHelper)
