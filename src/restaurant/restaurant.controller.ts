import { Context } from "hono";
import { restaurantService, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, searchRestaurants } from "./restaurant.service";

export const restaurantController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await restaurantService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Restaurants not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getRestaurant = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getRestaurantById(id);
        if (!data) {
            return c.text("Restaurant not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createRestaurantController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createRestaurant(body);
        return c.json({ msg: "Restaurant created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateRestaurantController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateRestaurant(id, body);
        if (!data) {
            return c.text("Restaurant not found", 404);
        }
        return c.json({ msg: "Restaurant updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteRestaurantController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteRestaurant(id);
        if (!data) {
            return c.text("Restaurant not found", 404);
        }
        return c.json({ msg: "Restaurant deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchRestaurantsController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchRestaurants(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Restaurants not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
