import { Context } from "hono";
import { orderStatusService, getOrderStatusById, createOrderStatus, updateOrderStatus, deleteOrderStatus, searchOrderStatuses } from "./order_status.service";

export const orderStatusController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await orderStatusService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Order statuses not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getOrderStatus = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getOrderStatusById(id);
        if (!data) {
            return c.text("Order status not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createOrderStatusController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createOrderStatus(body);
        return c.json({ msg: "Order status created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateOrderStatusController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateOrderStatus(id, body);
        if (!data) {
            return c.text("Order status not found", 404);
        }
        return c.json({ msg: "Order status updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteOrderStatusController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteOrderStatus(id);
        if (!data) {
            return c.text("Order status not found", 404);
        }
        return c.json({ msg: "Order status deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchOrderStatusesController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchOrderStatuses(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Order statuses not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
