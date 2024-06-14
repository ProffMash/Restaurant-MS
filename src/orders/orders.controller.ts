import { Context } from "hono";
import { ordersService, getOrderById, createOrder, updateOrder, deleteOrder, searchOrders } from "./orders.service";

export const ordersController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await ordersService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Orders not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getOrder = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getOrderById(id);
        if (!data) {
            return c.text("Order not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createOrderController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createOrder(body);
        return c.json({ msg: "Order created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateOrderController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateOrder(id, body);
        if (!data) {
            return c.text("Order not found", 404);
        }
        return c.json({ msg: "Order updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteOrderController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteOrder(id);
        if (!data) {
            return c.text("Order not found", 404);
        }
        return c.json({ msg: "Order deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchOrdersController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchOrders(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Orders not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
