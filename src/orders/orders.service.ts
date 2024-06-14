import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { orders } from "../drizzle/schema";

// Fetch all orders or limited by the given number
export const ordersService = async (limit?: number) => {
    if (limit) {
        return await db.query.orders.findMany({
            limit: limit,
        });
    }
    return await db.query.orders.findMany();
};

// Fetch one order by id
export const getOrderById = async (id: number) => {
    return await db.query.orders.findFirst({
        where: eq(orders.id, Number(id)),
        columns: {
            estimated_delivery_time: true,
            actual_delivery_time: true,
            comment: true
        }
    });
};

// Insert a new order
export const createOrder = async (data: typeof orders.$inferInsert) => {
    return await db.insert(orders).values(data);
};

// Update an order by id
export const updateOrder = async (id: number, data: Partial<typeof orders.$inferInsert>) => {
    return await db.update(orders).set(data).where(eq(orders.id, id));
};

// Delete an order by id
export const deleteOrder = async (id: number) => {
    return await db.delete(orders).where(eq(orders.id, id));
};

// Search for orders by a search term (e.g., order comment)
export const searchOrders = async (searchTerm: string) => {
    return await db.query.orders.findMany({
        where: like(orders.comment, `%${searchTerm}%`)
    });
};
