import { Context } from "hono";
import { statusCatalogService, getStatusCatalogById, createStatusCatalog, updateStatusCatalog, deleteStatusCatalog, searchStatusCatalogs } from "./status_catalog.service";

export const statusCatalogController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await statusCatalogService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Status catalogs not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getStatusCatalog = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getStatusCatalogById(id);
        if (!data) {
            return c.text("Status catalog not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createStatusCatalogController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createStatusCatalog(body);
        return c.json({ msg: "Status catalog created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateStatusCatalogController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateStatusCatalog(id, body);
        if (!data) {
            return c.text("Status catalog not found", 404);
        }
        return c.json({ msg: "Status catalog updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteStatusCatalogController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteStatusCatalog(id);
        if (!data) {
            return c.text("Status catalog not found", 404);
        }
        return c.json({ msg: "Status catalog deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchStatusCatalogsController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchStatusCatalogs(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Status catalogs not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
