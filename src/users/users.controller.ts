import { Context } from "hono";
import { userService, getUserById, createUser, updateUser, deleteUser, searchUsers } from "./users.service";

export const usersController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await userService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Users not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getUser = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getUserById(id);
        if (!data) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createUserController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createUser(body);
        return c.json({ msg: "User created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateUserController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateUser(id, body);
        if (!data) {
            return c.text("User not found", 404);
        }
        return c.json({ msg: "User updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteUserController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteUser(id);
        if (!data) {
            return c.text("User not found", 404);
        }
        return c.json({ msg: "User deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchUsersController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchUsers(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Users not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
