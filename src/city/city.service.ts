import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { city } from "../drizzle/schema";

// Fetch all cities or limited by the given number
export const cityService = async (limit?: number) => {
    if (limit) {
        return await db.query.city.findMany({
            limit: limit,
        });
    }
    return await db.query.city.findMany();
};

// Fetch one city by id
export const getCityById = async (id: number) => {
    return await db.query.city.findFirst({
        where: eq(city.id, Number(id))
    });
};

// Insert a new city
// Insert a new city
export const createCity = async (data: typeof city.$inferInsert) => {
    return await db.insert(city).values(data);
};

// Update a city by id
export const updateCity = async (id: number, data: Partial<typeof city.$inferInsert>) => {
    return await db.update(city).set(data).where(eq(city.id, id));
};

// Delete a city by id
export const deleteCity = async (id: number) => {
    return await db.delete(city).where(eq(city.id, id));
};

// Search for cities by a search term (e.g., city name)
export const searchCities = async (searchTerm: string) => {
    return await db.query.city.findMany({
        where: like(city.name, `%${searchTerm}%`)
    });
};
