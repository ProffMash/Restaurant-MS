import { Hono } from "hono";
import { restaurantController, getRestaurant, createRestaurantController, updateRestaurantController, deleteRestaurantController, searchRestaurantsController } from "./restaurant.controller";

export const restaurantRouter = new Hono();

restaurantRouter.get("/", restaurantController);
restaurantRouter.get("/:id", getRestaurant);
restaurantRouter.post("/", createRestaurantController);
restaurantRouter.put("/:id", updateRestaurantController);
restaurantRouter.delete("/:id", deleteRestaurantController);
restaurantRouter.get("/search", searchRestaurantsController);
