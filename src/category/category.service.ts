import { eq, like } from "drizzle-orm";
import db from "../drizzle/db";
import { category } from "../drizzle/schema";

// Fetch all categories or limited by the given number
export const categoryService = async (limit?: number) => {
    if (limit) {
        return await db.query.category.findMany({
            limit: limit,
        })
    }
    return await db.query.category.findMany();
}

// Fetch one category by id
export const getCategoryById = async (id: number) => {
    return await db.query.category.findFirst({
        where: eq(category.id, Number(id))
    })
}

// Insert a new category
export const createCategory = async (data: typeof category.$inferInsert) => {
    return await db.insert(category).values(data);
};

// Update a category by id
export const updateCategory = async (id: number, data: Partial<typeof category.$inferInsert>) => {
    return await db.update(category).set(data).where(eq(category.id, id));
};

// Delete a category by id
export const deleteCategory = async (id: number) => {
    return await db.delete(category).where(eq(category.id, id));
};

// Search for categories by a search term (e.g., category name)
export const searchCategories = async (searchTerm: string) => {
    return await db.query.category.findMany({
        where: like(category.name, `%${searchTerm}%`)
    });
};
