import { Hono } from "hono";
import { cityController, getCity, createCityController, updateCityController, deleteCityController, searchCitiesController } from "./city.controller";
import { bothresdriver  } from "../middleware/bearAuth";

export const cityRouter = new Hono();


cityRouter.get("/", bothresdriver, cityController);
cityRouter.get("/:id", bothresdriver, getCity);
cityRouter.post("/", createCityController);
cityRouter.put("/:id", updateCityController);
cityRouter.delete("/:id", deleteCityController);
cityRouter.get("/search", searchCitiesController);
 