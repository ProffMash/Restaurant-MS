import { AuthOnUsersTable, TIAuthOnUsersTable, TSAuthOnUsersTable } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

// Create authorization service
export const createAuthUserService = async (user: TIAuthOnUsersTable): Promise<string | null> => {
    await db.insert(AuthOnUsersTable).values(user);
    return "User created successfully";
}

// User login service
export const userLoginService = async (user: TSAuthOnUsersTable) => {
    const { username, password } = user;
    return await db.query.AuthOnUsersTable.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        },
        where: sql`${AuthOnUsersTable.username} = ${username}`,
        with: {
            user: {
                columns: {
                    name: true,
                    contact_phone: true,
                    id: true
                }
            }
        }
    });
}

