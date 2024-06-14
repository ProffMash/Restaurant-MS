import { Context } from "hono";
import { cityService, getCityById, createCity, updateCity, deleteCity, searchCities } from "./city.service";

export const cityController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await cityService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Cities not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getCity = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getCityById(id);
        if (!data) {
            return c.text("City not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createCityController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createCity(body);
        return c.json({ msg: "City created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateCityController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateCity(id, body);
        if (!data) {
            return c.text("City not found", 404);
        }
        return c.json({ msg: "City updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteCityController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteCity(id);
        if (!data) {
            return c.text("City not found", 404);
        }
        return c.json({ msg: "City deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchCitiesController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchCities(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Cities not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
