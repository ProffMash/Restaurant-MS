import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { order_status } from "../drizzle/schema";

// Fetch all order statuses or limited by the given number
export const orderStatusService = async (limit?: number) => {
    if (limit) {
        return await db.query.order_status.findMany({
            limit: limit,
        });
    }
    return await db.query.order_status.findMany();
};

// Fetch one order status by id
export const getOrderStatusById = async (id: number) => {
    return await db.query.order_status.findFirst({
        where: eq(order_status.id, Number(id))
    });
};

// Insert a new order status
export const createOrderStatus = async (data: typeof order_status.$inferInsert) => {
    return await db.insert(order_status).values(data);
};

// Update an order status by id
export const updateOrderStatus = async (id: number, data: Partial<typeof order_status.$inferInsert>) => {
    return await db.update(order_status).set(data).where(eq(order_status.id, id));
};

// Delete an order status by id
export const deleteOrderStatus = async (id: number) => {
    return await db.delete(order_status).where(eq(order_status.id, id));
};

// Search for order statuses by a search term (e.g., status name)
export const searchOrderStatuses = async (searchTerm: string) => {
    return await db.query.order_status.findMany({
        where: like(order_status.id, `%${searchTerm}%`)
    });
};
