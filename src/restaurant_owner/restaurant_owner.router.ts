import { Hono } from "hono";
import { restaurant_ownerController, getRestaurantOwner, createRestaurantOwnerController, updateRestaurantOwnerController, deleteRestaurantOwnerController, searchRestaurantOwnersController } from "./restaurant_owner.controller";

export const restaurant_ownerRouter = new Hono();

restaurant_ownerRouter.get("/", restaurant_ownerController);
restaurant_ownerRouter.get("/:id", getRestaurantOwner);
restaurant_ownerRouter.post("/", createRestaurantOwnerController);
restaurant_ownerRouter.put("/:id", updateRestaurantOwnerController);
restaurant_ownerRouter.delete("/:id", deleteRestaurantOwnerController);
restaurant_ownerRouter.get("/search", searchRestaurantOwnersController);
