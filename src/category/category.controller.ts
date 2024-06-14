import { Context } from "hono";
import { categoryService, getCategoryById, createCategory, updateCategory, deleteCategory, searchCategories } from "./category.service";

export const categoryController = async (c: Context) => {
    try {
        const limit = c.req.query('limit');
        const data = await categoryService(limit ? Number(limit) : undefined);
        if (data == null || data.length == 0) {
            return c.text("Categories not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getCategory = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await getCategoryById(id);
        if (!data) {
            return c.text("Category not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createCategoryController = async (c: Context) => {
    try {
        const body = await c.req.json();
        const data = await createCategory(body);
        return c.json({ msg: "Category created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateCategoryController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const body = await c.req.json();
        const data = await updateCategory(id, body);
        if (!data) {
            return c.text("Category not found", 404);
        }
        return c.json({ msg: "Category updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteCategoryController = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return c.json({ error: "Invalid ID" }, 400);
        }

        const data = await deleteCategory(id);
        if (!data) {
            return c.text("Category not found", 404);
        }
        return c.json({ msg: "Category deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchCategoriesController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';

        const data = await searchCategories(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Categories not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
