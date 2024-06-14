import { Hono } from "hono";
import { usersController, getUser, createUserController, updateUserController, deleteUserController, searchUsersController } from "./users.controller";
//import { adminRoleAuth } from "../middleware/bearAuth";
//import { driverRoleAuth } from "../middleware/bearAuth";
import { userRoleAuth } from "../middleware/bearAuth";
export const usersRouter = new Hono();

usersRouter.get("/", userRoleAuth, usersController);
usersRouter.get("/:id", userRoleAuth, getUser);
usersRouter.post("/", userRoleAuth, createUserController);
usersRouter.put("/:id", updateUserController);
usersRouter.delete("/:id", deleteUserController);
usersRouter.get("/search", searchUsersController);

