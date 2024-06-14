import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { users } from "../drizzle/schema";


// Fetch all users or limited by the given number
export const userService = async (limit?: number) => {
    if (limit) {
        return await db.query.users.findMany({
            limit: limit,
        });
    }
    return await db.query.users.findMany();
};

// Fetch one user by id
export const getUserById = async (id: number) => {
    return await db.query.users.findFirst({
        where: eq(users.id, Number(id)),
        columns:{
            name:true,
            email:true
        }
    });
};

// Insert a new user
export const createUser = async (data: typeof users.$inferInsert) => {
    return await db.insert(users).values(data);
};

// Update a user by id
export const updateUser = async (id: number, data: Partial<typeof users.$inferInsert>) => {
    return await db.update(users).set(data).where(eq(users.id, id));
};

// Delete a user by id
export const deleteUser = async (id: number) => {
    return await db.delete(users).where(eq(users.id, id));
};

// Search for users by a search term (e.g., user name)
export const searchUsers = async (searchTerm: string) => {
    return await db.query.users.findMany({
        where: like(users.name, `%${searchTerm}%`)
    });
};

