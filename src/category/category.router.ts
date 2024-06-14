import { Hono } from "hono";
import { categoryController, getCategory, createCategoryController, updateCategoryController, deleteCategoryController, searchCategoriesController } from "./category.controller";
import { restaurant_ownerRoleAuth } from "../middleware/bearAuth";

export const categoryRouter = new Hono();

categoryRouter.get("/", restaurant_ownerRoleAuth ,categoryController);
categoryRouter.get("/:id", restaurant_ownerRoleAuth ,getCategory);
categoryRouter.post("/", restaurant_ownerRoleAuth, createCategoryController);
categoryRouter.put("/:id", restaurant_ownerRoleAuth, updateCategoryController);
categoryRouter.delete("/:id", restaurant_ownerRoleAuth , deleteCategoryController);
categoryRouter.get("/search",restaurant_ownerRoleAuth, searchCategoriesController);
