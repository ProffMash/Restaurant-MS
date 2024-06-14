import { Context } from "hono";
import { addressService, getAddressById, createAddress, updateAddress, deleteAddress, searchAddresses } from "./address.service";

export const addressController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await addressService(limit);
        if (data == null || data.length == 0) {
            return c.text("Address not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getAddress = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));

        const data = await getAddressById(id);
        if (!data) {
            return c.text("Address not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createAddressController = async (c: Context) => {
    try {
        const body = await c.req.json();

        const data = await createAddress(body);
        return c.json({msg:data}, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateAddressController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        const body = await c.req.json();

        const data = await updateAddress(id, body);
        if (!data) {
            return c.text("Address not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteAddressController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));

        const data = await deleteAddress(id);
        if (!data) {
            return c.text("Address not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchAddressesController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';
        
        const data = await searchAddresses(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Address not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
