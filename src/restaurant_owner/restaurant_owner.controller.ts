import { Context } from "hono";
import { restaurant_ownerService, getRestaurantOwnerById, createRestaurantOwner, updateRestaurantOwner, deleteRestaurantOwner, searchRestaurantOwners } from "./restaurant_owner.service";

export const restaurant_ownerController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await restaurant_ownerService(limit);
        if (data == null || data.length == 0) {
            return c.text("Restaurant_owner not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getRestaurantOwner = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));

        const data = await getRestaurantOwnerById(id);
        if (!data) {
            return c.text("Restaurant_owner not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createRestaurantOwnerController = async (c: Context) => {
    try {
        const body = await c.req.json();

        const data = await createRestaurantOwner(body);
        return c.json({msg:data}, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateRestaurantOwnerController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        const body = await c.req.json();

        const data = await updateRestaurantOwner(id, body);
        if (!data) {
            return c.text("Restaurant_owner not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteRestaurantOwnerController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));

        const data = await deleteRestaurantOwner(id);
        if (!data) {
            return c.text("Restaurant_owner not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchRestaurantOwnersController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';
        
        const data = await searchRestaurantOwners(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Restaurant_owner not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
