import { Hono } from "hono";
import { driverController, getDriver, createDriverController, updateDriverController, deleteDriverController, searchDriversController } from "./driver.controller";
import { bothadmindriver } from "../middleware/bearAuth"

export const driverRouter = new Hono();

driverRouter.get("/", bothadmindriver, driverController);
driverRouter.get("/:id",bothadmindriver, getDriver);
driverRouter.post("/", bothadmindriver, createDriverController);
driverRouter.put("/:id", updateDriverController);
driverRouter.delete("/:id", deleteDriverController);
driverRouter.get("/search", bothadmindriver, searchDriversController);
