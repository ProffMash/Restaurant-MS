import { like, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { driver, orders, users } from "../drizzle/schema";

// Fetch all drivers or limited by the given number
export const driverService = async (limit?: number) => {
    if (limit) {
        return await db.query.driver.findMany({
            limit: limit,
        });
    }
    return await db.query.driver.findMany();
};

// Fetch one driver by id
export const getDriverById = async (id: number) => {
    return await db.query.driver.findFirst({
        where: (eq(driver.id, Number(id))),
        columns: {
            car_make: true,
            car_model: true,
            car_year: true,
        },
    });
};

// Insert a new driver
export const createDriver = async (data: typeof driver.$inferInsert) => {
    return await db.insert(driver).values(data);
};

// Update a driver by id
export const updateDriver = async (id: number, data: Partial<typeof driver.$inferInsert>) => {
    return await db.update(driver).set(data).where(eq(driver.id, id));
};

// Delete a driver by id
export const deleteDriver = async (id: number) => {
    return await db.delete(driver).where(eq(driver.id, id));
};

// Search for drivers by a search term (e.g., driver name)
export const searchDrivers = async (searchTerm: string) => {
    return await db.query.driver.findMany({
        where: like(driver.id, `%${searchTerm}%`)
    });
};

// Fetch one driver by id with related data
export const getDriverWithDetails = async (id: number) => {
    return await db.query.driver.findFirst({
        where: eq(driver.id, id),
        with: {
            orders:true,
            user: true//columns
        },
    });
};
