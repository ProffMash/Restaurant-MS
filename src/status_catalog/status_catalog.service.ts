import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { status_catalog } from "../drizzle/schema";

// Fetch all status catalogs or limited by the given number
export const statusCatalogService = async (limit?: number) => {
    if (limit) {
        return await db.query.status_catalog.findMany({
            limit: limit,
        });
    }
    return await db.query.status_catalog.findMany();
};

// Fetch one status catalog by id
export const getStatusCatalogById = async (id: number) => {
    return await db.query.status_catalog.findFirst({
        where: eq(status_catalog.id, Number(id))
    });
};

// Insert a new status catalog
export const createStatusCatalog = async (data: typeof status_catalog.$inferInsert) => {
    return await db.insert(status_catalog).values(data);
};

// Update a status catalog by id
export const updateStatusCatalog = async (id: number, data: Partial<typeof status_catalog.$inferInsert>) => {
    return await db.update(status_catalog).set(data).where(eq(status_catalog.id, id));
};

// Delete a status catalog by id
export const deleteStatusCatalog = async (id: number) => {
    return await db.delete(status_catalog).where(eq(status_catalog.id, id));
};

// Search for status catalogs by a search term (e.g., status catalog name)
export const searchStatusCatalogs = async (searchTerm: string) => {
    return await db.query.status_catalog.findMany({
        where: like(status_catalog.name, `%${searchTerm}%`)
    });
};
