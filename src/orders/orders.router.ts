import { Hono } from "hono";
import { ordersController, getOrder, createOrderController, updateOrderController, deleteOrderController, searchOrdersController } from "./orders.controller";

import { bothdriveruseradmin } from "../middleware/bearAuth";

export const ordersRouter = new Hono();

ordersRouter.get("/", bothdriveruseradmin, ordersController);
ordersRouter.get("/:id",bothdriveruseradmin, getOrder);
ordersRouter.post("/", bothdriveruseradmin, createOrderController);
ordersRouter.put("/:id", bothdriveruseradmin, updateOrderController);
ordersRouter.delete("/:id", deleteOrderController);
ordersRouter.get("/search", searchOrdersController);
