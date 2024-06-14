import { Context } from "hono";
import { driverService, getDriverById, createDriver, updateDriver, deleteDriver, searchDrivers } from "./driver.service";

export const driverController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await driverService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Drivers not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getDriver = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getDriverById(id);
        if (!data) {
            return c.text("Driver not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createDriverController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createDriver(body);
        return c.json({ msg: "Driver created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateDriverController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateDriver(id, body);
        if (!data) {
            return c.text("Driver not found", 404);
        }
        return c.json({ msg: "Driver updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteDriverController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteDriver(id);
        if (!data) {
            return c.text("Driver not found", 404);
        }
        return c.json({ msg: "Driver deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchDriversController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchDrivers(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Drivers not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
