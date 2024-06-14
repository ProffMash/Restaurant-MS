import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { restaurant } from "../drizzle/schema";

// Fetch all restaurants or limited by the given number
export const restaurantService = async (limit?: number) => {
    if (limit) {
        return await db.query.restaurant.findMany({
            limit: limit,
        });
    }
    return await db.query.restaurant.findMany();
};

// Fetch one restaurant by id
export const getRestaurantById = async (id: number) => {
    return await db.query.restaurant.findFirst({
        where: eq(restaurant.id, Number(id))
    });
};

// Insert a new restaurant
export const createRestaurant = async (data: typeof restaurant.$inferInsert) => {
    return await db.insert(restaurant).values(data);
};

// Update a restaurant by id
export const updateRestaurant = async (id: number, data: Partial<typeof restaurant.$inferInsert>) => {
    return await db.update(restaurant).set(data).where(eq(restaurant.id, id));
};

// Delete a restaurant by id
export const deleteRestaurant = async (id: number) => {
    return await db.delete(restaurant).where(eq(restaurant.id, id));
};

// Search for restaurants by a search term (e.g., restaurant name)
export const searchRestaurants = async (searchTerm: string) => {
    return await db.query.restaurant.findMany({
        where: like(restaurant.id, `%${searchTerm}%`)
    });
};
