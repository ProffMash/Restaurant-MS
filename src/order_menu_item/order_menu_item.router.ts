import { Hono } from "hono";
import { orderMenuItemController, getOrderMenuItem, createOrderMenuItemController, updateOrderMenuItemController, deleteOrderMenuItemController, searchOrderMenuItemsController } from "./order_menu_item.controller";

export const orderMenuItemRouter = new Hono();

orderMenuItemRouter.get("/", orderMenuItemController);
orderMenuItemRouter.get("/:id", getOrderMenuItem);
orderMenuItemRouter.post("/", createOrderMenuItemController);
orderMenuItemRouter.put("/:id", updateOrderMenuItemController);
orderMenuItemRouter.delete("/:id", deleteOrderMenuItemController);
orderMenuItemRouter.get("/search", searchOrderMenuItemsController);
