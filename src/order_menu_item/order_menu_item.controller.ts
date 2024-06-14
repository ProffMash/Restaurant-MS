import { Context } from "hono";
import { orderMenuItemService, getOrderMenuItemById, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem, searchOrderMenuItems } from "./order_menu_item.service";

export const orderMenuItemController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await orderMenuItemService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Order menu items not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getOrderMenuItem = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getOrderMenuItemById(id);
        if (!data) {
            return c.text("Order menu item not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createOrderMenuItemController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createOrderMenuItem(body);
        return c.json({ msg: "Order menu item created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateOrderMenuItemController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateOrderMenuItem(id, body);
        if (!data) {
            return c.text("Order menu item not found", 404);
        }
        return c.json({ msg: "Order menu item updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteOrderMenuItemController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteOrderMenuItem(id);
        if (!data) {
            return c.text("Order menu item not found", 404);
        }
        return c.json({ msg: "Order menu item deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchOrderMenuItemsController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchOrderMenuItems(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Order menu items not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
