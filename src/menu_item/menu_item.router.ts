import { Hono } from "hono";
import { menuItemsController, getMenuItem, createMenuItemController, updateMenuItemController, deleteMenuItemController, searchMenuItemsController } from "./menu_item.controller";
import { bothuserres } from "../middleware/bearAuth";

export const menuItemsRouter = new Hono();

menuItemsRouter.get("/", bothuserres, menuItemsController);
menuItemsRouter.get("/:id", bothuserres, getMenuItem);
menuItemsRouter.post("/", createMenuItemController);
menuItemsRouter.put("/:id", updateMenuItemController);
menuItemsRouter.delete("/:id", deleteMenuItemController);
menuItemsRouter.get("/search", bothuserres, searchMenuItemsController);
