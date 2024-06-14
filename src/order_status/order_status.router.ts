import { Hono } from "hono";
import { orderStatusController, getOrderStatus, createOrderStatusController, updateOrderStatusController, deleteOrderStatusController, searchOrderStatusesController } from "./order_status.controller";

export const orderStatusRouter = new Hono();

orderStatusRouter.get("/", orderStatusController);
orderStatusRouter.get("/:id", getOrderStatus);
orderStatusRouter.post("/", createOrderStatusController);
orderStatusRouter.put("/:id", updateOrderStatusController);
orderStatusRouter.delete("/:id", deleteOrderStatusController);
orderStatusRouter.get("/search", searchOrderStatusesController);
