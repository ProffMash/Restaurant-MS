import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./auth.service";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

// Register user
export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await createAuthUserService(user);
        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Login user
export const loginUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        // Check if user exists
        const userExist = await userLoginService(user);
        if (userExist === null) return c.json({ error: "User not found" }, 404);
        const userMatch = await bcrypt.compare(user.password, userExist?.password as string);
        if (!userMatch) {
            return c.json({ error: "Invalid credentials" }, 401);
        } else {
            // Create a payload
            const payload = {
                sub: userExist?.username,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180) // 3 hours
            }
            let secret = process.env.JWT_SECRET as string;
            const token = await sign(payload, secret);
            const user = userExist?.user;
            const role = userExist?.role;
            return c.json({ token, user: { role, ...user } }, 200);
        }
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
