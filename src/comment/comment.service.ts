import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { comment } from "../drizzle/schema";

// Fetch all comments or limited by the given number
export const commentService = async (limit?: number) => {
    if (limit) {
        return await db.query.comment.findMany({
            limit: limit,
        });
    }
    return await db.query.comment.findMany();
};

// Fetch one comment by id
export const getCommentById = async (id: number) => {
    return await db.query.comment.findFirst({
        where: eq(comment.id, Number(id)),
        columns: {
            comment_text: true,
            created_at: true,
            updated_at: true
        },
    });
};

// Insert a new comment
export const createComment = async (data: typeof comment.$inferInsert) => {
    return await db.insert(comment).values(data);
};

// Update a comment by id
export const updateComment = async (id: number, data: Partial<typeof comment.$inferInsert>) => {
    return await db.update(comment).set(data).where(eq(comment.id, id));
};

// Delete a comment by id
export const deleteComment = async (id: number) => {
    return await db.delete(comment).where(eq(comment.id, id));
};

// Search for comments by a search term (e.g., comment text)
export const searchComments = async (searchTerm: string) => {
    return await db.query.comment.findMany({
        where: like(comment.comment_text, `%${searchTerm}%`)
    });
};

//user getting his comment
export const getUserComment = async (id: number) => {
    return await db.query.comment.findMany({
        where: eq(comment.user_id, id)
    });
}