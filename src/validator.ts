import { z } from "zod";

// Address Validator
export const addressValidator = z.object({

  street_address_1: z.string().max(50),
  street_address_2: z.string().max(50).nullable(),
  zip_code: z.string().max(15),
  delivery_instructions: z.string().max(100).nullable(),
  user_id: z.number(),
  city_id: z.number()
});

// Category Validator
export const categoryValidator = z.object({
  id: z.number().optional(),
  name: z.string().max(50)
});

// City Validator
export const cityValidator = z.object({
  id: z.number().optional(),
  name: z.string().max(50),
  state_id: z.number()
});

// Comment Validator
export const commentValidator = z.object({
  id: z.number().optional(),
  order_id: z.number(),
  user_id: z.number(),
  comment_text: z.string().max(100),
  is_complaint: z.boolean(),
  is_praise: z.boolean(),
  created_at: z.date(),
  updated_at: z.date()
});

// Driver Validator
export const driverValidator = z.object({
  id: z.number().optional(),
  car_make: z.string().max(20),
  car_model: z.string().max(20),
  car_year: z.number(),
  user_id: z.number(),
  online: z.boolean(),
  delivering: z.boolean(),
  created_at: z.date(),
  updated_at: z.date()
});

// MenuItem Validator
export const menuItemValidator = z.object({
  id: z.number().optional(),
  name: z.string().max(255),
  restaurant_id: z.number(),
  category_id: z.number(),
  description: z.string().max(100),
  ingredients: z.string().max(50),
  price: z.number().min(0),
  active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date()
});

// OrderMenuItem Validator
export const orderMenuItemValidator = z.object({
  id: z.number().optional(),
  order_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number().min(0),
  item_price: z.number().min(0),
  price: z.number().min(0),
  comment: z.string().max(100).nullable()
});

// OrderStatus Validator
export const orderStatusValidator = z.object({
  id: z.number().optional(),
  order_id: z.number(),
  status_catalog_id: z.number(),
  created_at: z.date()
});

// Orders Validator
export const ordersValidator = z.object({
  id: z.number().optional(),
  restaurant_id: z.number(),
  estimated_delivery_time: z.date().nullable(),
  actual_delivery_time: z.date().nullable(),
  delivery_address_id: z.number(),
  user_id: z.number(),
  driver_id: z.number(),
  price: z.number().min(0),
  discount: z.number().min(0),
  final_price: z.number().min(0),
  comment: z.string().max(100).nullable(),
  created_at: z.date(),
  updated_at: z.date()
});

// Restaurant Validator
export const restaurantValidator = z.object({
  id: z.number().optional(),
  name: z.string().max(50),
  street_address: z.string().max(50),
  zip_code: z.string().max(20),
  city_id: z.number(),
  created_at: z.date(),
  updated_at: z.date()
});

// State Validator
export const stateValidator = z.object({
  id: z.number().optional(),
  name: z.string().max(50),
  code: z.string().max(10)
});

// StatusCatalog Validator
export const statusCatalogValidator = z.object({
  id: z.number().optional(),
  name: z.string().max(50)
});

// Users Validator
export const usersValidator = z.object({
  id: z.number().optional(),
  name: z.string().max(50),
  contact_phone: z.string().max(15),
  phone_verified: z.boolean(),
  email: z.string().max(50).email(),
  email_verified: z.boolean(),
  confirmation_code: z.string().max(15).nullable(),
  password: z.string().max(50),
  created_at: z.date(),
  updated_at: z.date()
});

// Login User Validator
export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string()
})

// Register User Validator
export const registerUserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  role: z.string().optional(),
})

// RestaurantOwner Validator
export const restaurantOwnerValidator = z.object({
  id: z.number().optional(),
  restaurant_id: z.number(),
  owner_id: z.number()
});
