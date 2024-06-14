import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { order_menu_item } from "../drizzle/schema";

// Fetch all order menu items or limited by the given number
export const orderMenuItemService = async (limit?: number) => {
    if (limit) {
        return await db.query.order_menu_item.findMany({
            limit: limit,
        });
    }
    return await db.query.order_menu_item.findMany();
};

// Fetch one order menu item by id
export const getOrderMenuItemById = async (id: number) => {
    return await db.query.order_menu_item.findFirst({
        where: eq(order_menu_item.id, Number(id))
    });
};

// Insert a new order menu item
export const createOrderMenuItem = async (data: typeof order_menu_item.$inferInsert) => {
    return await db.insert(order_menu_item).values(data);
};

// Update an order menu item by id
export const updateOrderMenuItem = async (id: number, data: Partial<typeof order_menu_item.$inferInsert>) => {
    return await db.update(order_menu_item).set(data).where(eq(order_menu_item.id, id));
};

// Delete an order menu item by id
export const deleteOrderMenuItem = async (id: number) => {
    return await db.delete(order_menu_item).where(eq(order_menu_item.id, id));
};

// Search for order menu items by a search term (e.g., menu item name)
export const searchOrderMenuItems = async (searchTerm: string) => {
    return await db.query.order_menu_item.findMany({
        where: like(order_menu_item.comment, `%${searchTerm}%`)
    });
};
