import { eq, like } from "drizzle-orm";
import db from "../drizzle/db";
import { restaurant_owner } from "../drizzle/schema";

// Fetch all restaurant owners or limited by the given number
export const restaurant_ownerService = async (limit?: number) => {
    if (limit) {
        return await db.query.restaurant_owner.findMany({
            limit: limit,
        });
    }
    return await db.query.restaurant_owner.findMany();
};

// Fetch one restaurant owner by id
export const getRestaurantOwnerById = async (id: number) => {
    return await db.query.restaurant_owner.findFirst({
        where: eq(restaurant_owner.id, Number(id))
    });
};

// Insert a new restaurant owner
export const createRestaurantOwner = async (data: typeof restaurant_owner.$inferInsert) => {
    return await db.insert(restaurant_owner).values(data);
};

// Update a restaurant owner by id
export const updateRestaurantOwner = async (id: number, data: Partial<typeof restaurant_owner.$inferInsert>) => {
    return await db.update(restaurant_owner).set(data).where(eq(restaurant_owner.id, id));
};

// Delete a restaurant owner by id
export const deleteRestaurantOwner = async (id: number) => {
    return await db.delete(restaurant_owner).where(eq(restaurant_owner.id, id));
};

// Search for restaurant owners by a search term (e.g., owner_id)
export const searchRestaurantOwners = async (searchTerm: string) => {
    return await db.query.restaurant_owner.findMany({
        where: like(restaurant_owner.owner_id, `%${searchTerm}%`)
    });
};
