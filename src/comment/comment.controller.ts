import { Context } from "hono";
import { commentService, getCommentById, createComment, updateComment, deleteComment, searchComments } from "./comment.service";

export const commentsController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await commentService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Comments not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getComment = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getCommentById(id);
        if (!data) {
            return c.text("Comment not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createCommentController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createComment(body);
        return c.json({ msg: "Comment created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateCommentController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateComment(id, body);
        if (!data) {
            return c.text("Comment not found", 404);
        }
        return c.json({ msg: "Comment updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteCommentController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteComment(id);
        if (!data) {
            return c.text("Comment not found", 404);
        }
        return c.json({ msg: "Comment deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchCommentsController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchComments(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Comments not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
