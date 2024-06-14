import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { menu_item } from "../drizzle/schema";

// Fetch all menu items or limited by the given number
export const menuItemService = async (limit?: number) => {
    if (limit) {
        return await db.query.menu_item.findMany({
            limit: limit,
        });
    }
    return await db.query.menu_item.findMany();
};

// Fetch one menu item by id
export const getMenuItemById = async (id: number) => {
    return await db.query.menu_item.findFirst({
        where: eq(menu_item.id, Number(id))
    });
};

// Insert a new menu item
export const createMenuItem = async (data: typeof menu_item.$inferInsert) => {
    return await db.insert(menu_item).values(data);
};

// Update a menu item by id
export const updateMenuItem = async (id: number, data: Partial<typeof menu_item.$inferInsert>) => {
    return await db.update(menu_item).set(data).where(eq(menu_item.id, id));
};

// Delete a menu item by id
export const deleteMenuItem = async (id: number) => {
    return await db.delete(menu_item).where(eq(menu_item.id, id));
};

// Search for menu items by a search term (e.g., menu item name)
export const searchMenuItems = async (searchTerm: string) => {
    return await db.query.menu_item.findMany({
        where: like(menu_item.name, `%${searchTerm}%`)
    });
};
