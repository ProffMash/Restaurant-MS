import { Context } from "hono";
import { menuItemService, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem, searchMenuItems } from "./menu_item.service";

export const menuItemsController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await menuItemService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Menu items not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getMenuItem = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getMenuItemById(id);
        if (!data) {
            return c.text("Menu item not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createMenuItemController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createMenuItem(body);
        return c.json({ msg: "Menu item created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateMenuItemController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateMenuItem(id, body);
        if (!data) {
            return c.text("Menu item not found", 404);
        }
        return c.json({ msg: "Menu item updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteMenuItemController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteMenuItem(id);
        if (!data) {
            return c.text("Menu item not found", 404);
        }
        return c.json({ msg: "Menu item deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchMenuItemsController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchMenuItems(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Menu items not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
