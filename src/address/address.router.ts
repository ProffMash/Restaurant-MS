import { Hono } from "hono";
import { addressController, getAddress, createAddressController, updateAddressController, deleteAddressController, searchAddressesController } from "./address.controller";

export const addressRouter = new Hono();

addressRouter.get("/", addressController);
addressRouter.get("/:id", getAddress);
addressRouter.post("/", createAddressController);
addressRouter.put("/:id", updateAddressController);
addressRouter.delete("/:id", deleteAddressController);
addressRouter.get("/search", searchAddressesController);
