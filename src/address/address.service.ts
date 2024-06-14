import { eq, like } from "drizzle-orm";
import db from "../drizzle/db";
import { address } from "../drizzle/schema";

// Fetch all addresses or limited by the given number
export const addressService = async (limit?: number) => {
    if (limit) {
        return await db.query.address.findMany({
            limit: limit,
        });
    }
    return await db.query.address.findMany();
};

// Fetch one address by id
export const getAddressById = async (id: number) => {
    return await db.query.address.findFirst({
        where: eq(address.id, Number(id))
    });
};

// Insert a new address
export const createAddress = async (data: typeof address.$inferInsert) => {
    return await db.insert(address).values(data);
};

// Update an address by id
export const updateAddress = async (id: number, data: Partial<typeof address.$inferInsert>) => {
    return await db.update(address).set(data).where(eq(address.id, id));
};

// Delete an address by id
export const deleteAddress = async (id: number) => {
    return await db.delete(address).where(eq(address.id, id));
};

// Search for addresses by a search term (e.g., city)
export const searchAddresses = async (searchTerm: string) => {
    return await db.query.address.findMany({
        where: like(address.zip_code, `%${searchTerm}%`)
    });
};
