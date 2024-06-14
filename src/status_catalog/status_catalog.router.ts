import { Hono } from "hono";
import { statusCatalogController, getStatusCatalog, createStatusCatalogController, updateStatusCatalogController, deleteStatusCatalogController, searchStatusCatalogsController } from "./status_catalog.controller";

export const statusCatalogRouter = new Hono();

statusCatalogRouter.get("/", statusCatalogController);
statusCatalogRouter.get("/:id", getStatusCatalog);
statusCatalogRouter.post("/", createStatusCatalogController);
statusCatalogRouter.put("/:id", updateStatusCatalogController);
statusCatalogRouter.delete("/:id", deleteStatusCatalogController);
statusCatalogRouter.get("/search", searchStatusCatalogsController);
