import { pgTable, serial, varchar, integer, timestamp, decimal, boolean, pgEnum, } from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm";

// Address Table
export const address = pgTable('address', {
    id: serial('id').primaryKey(),
    street_address_1: varchar('street_address_1', { length: 50 }).notNull(),
    street_address_2: varchar('street_address_2', { length: 50 }),
    zip_code: varchar('zip_code', { length: 15 }).notNull(),
    delivery_instructions: varchar('delivery_instructions', { length: 100 }),
    user_id: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade"}),
    city_id: integer('city_id').notNull().references(() => city.id, { onDelete: "cascade"}),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
    updated_at: timestamp('updated_at').default(sql`NOW()`).notNull()
});

// Category table
export const category = pgTable('category', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull()
});

// City table
export  const city = pgTable('city', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    state_id: integer('state_id').notNull().references(() => state.id, { onDelete: "cascade"})
});

// Comment table
export const comment = pgTable('comment', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => orders.id, { onDelete: "cascade"}),
    user_id: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade"}),
    comment_text: varchar('comment_text', { length: 100 }).notNull(),
    is_complaint: boolean('is_complaint').notNull(),
    is_praise: boolean('is_praise').notNull(),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
    updated_at: timestamp('updated_at').default(sql`NOW()`).notNull()
});

// Driver table
export const driver = pgTable('driver', {
    id: serial('id').primaryKey(),
    car_make: varchar('car_make', { length: 20 }).notNull(),
    car_model: varchar('car_model', { length: 20 }).notNull(),
    car_year: integer('car_year').notNull(),
    user_id: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade"}),
    online: boolean('online').notNull(),
    delivering: boolean('delivering').notNull(),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
    updated_at: timestamp('updated_at').default(sql`NOW()`).notNull()
});

// MenuItem table
export const menu_item = pgTable('menu_item', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    restaurant_id: integer('restaurant_id').notNull().references(() => restaurant.id, { onDelete: "cascade"}),
    category_id: integer('category_id').notNull().references(() => category.id, { onDelete: "cascade"}),
    description: varchar('description', { length: 100 }).notNull(),
    ingredients: varchar('ingredients', { length: 50 }).notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    active: boolean('active').notNull(),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
    updated_at: timestamp('updated_at').default(sql`NOW()`).notNull()
});

// OrderMenuItem table
export const order_menu_item = pgTable('order_menu_item', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => orders.id, { onDelete: "cascade"}),
    menu_item_id: integer('menu_item_id').notNull().references(() => menu_item.id, { onDelete: "cascade"}),
    quantity: integer('quantity').notNull(),
    item_price: decimal('item_price', { precision: 10, scale: 2 }).notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    comment: varchar('comment', { length: 100 })
});

// OrderStatus table
export const order_status = pgTable('order_status', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => orders.id, { onDelete: "cascade"}),
    status_catalog_id: integer('status_catalog_id').notNull().references(() => status_catalog.id, { onDelete: "cascade"}),
    created_at: timestamp('created_at').notNull().defaultNow()
});

// Orders table
export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    restaurant_id: integer('restaurant_id').notNull().references(() => restaurant.id, { onDelete: "cascade"}),
    estimated_delivery_time: timestamp('estimated_delivery_time'),
    actual_delivery_time: timestamp('actual_delivery_time'),
    delivery_address_id: integer('delivery_address_id').notNull().references(() => address.id, { onDelete: "cascade"}),
    user_id: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade"}),
    driver_id: integer('driver_id').notNull().references(() => driver.id, { onDelete: "cascade"}),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    discount: decimal('discount', { precision: 10, scale: 2 }).notNull(),
    final_price: decimal('final_price', { precision: 10, scale: 2 }).notNull(),
    comment: varchar('comment', { length: 100 }),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
    updated_at: timestamp('updated_at').default(sql`NOW()`).notNull()
});

// Restaurant table
export const restaurant = pgTable('restaurant', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    street_address: varchar('street_address', { length: 50 }).notNull(),
    zip_code: varchar('zip_code', { length: 20 }).notNull(),
    city_id: integer('city_id').notNull().references(() => city.id, { onDelete: "cascade"}),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
    updated_at: timestamp('updated_at').default(sql`NOW()`).notNull()
});

// State table
export const state = pgTable('state', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    code: varchar('code', { length: 10 }).notNull()
});

// StatusCatalog table
export const status_catalog = pgTable('status_catalog', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull()
});

// Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    contact_phone: varchar('contact_phone', { length: 15 }).notNull(),
    phone_verified: boolean('phone_verified').notNull(),
    email: varchar('email', { length: 50 }).notNull(),
    email_verified: boolean('email_verified').notNull(),
    confirmation_code: varchar('confirmation_code', { length: 15 }),
    password: varchar('password', { length: 50 }).notNull(),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
    updated_at: timestamp('updated_at').default(sql`NOW()`).notNull()
});
// Auth Table
export const roleEnum = pgEnum("role",["admin", "user", "driver", "restaurant_owner"])
export const AuthOnUsersTable = pgTable("auth_on_users", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete:"cascade"}),
    password: varchar("password", { length: 255}),
    username: varchar("username", { length: 255 }),
    role: roleEnum("role").default("user")
})  

export const AuthOnUsersTableRelations = relations(AuthOnUsersTable, ({ one }) =>({
    user: one(users, { fields: [AuthOnUsersTable.userId], references: [users.id]})
}))




// RestaurantOwner table
export const restaurant_owner = pgTable('restaurant_owner', {
    id: serial('id').primaryKey(),
    restaurant_id: integer('restaurant_id').notNull().references(() => restaurant.id, { onDelete: "cascade"}),
    owner_id: integer('owner_id').notNull().references(() => users.id, { onDelete: "cascade"})
});





/* ------Relationships-------- */

// Address Relations
const addressRelations = relations(address, ({ one }) => ({
    user: one(users, { fields: [address.user_id], references: [users.id] }),
    city: one(city, { fields: [address.city_id], references: [city.id] }),
}));

// Category Relations
const categoryRelations = relations(category, ({ many }) => ({
    menuItems: many(menu_item),
}));

// City Relations
const cityRelations = relations(city, ({ one, many }) => ({
    state: one(state, { fields: [city.state_id], references: [state.id] }),
    addresses: many(address),
    restaurants: many(restaurant),
}));

// Comment Relations
const commentRelations = relations(comment, ({ one }) => ({
    order: one(orders, { fields: [comment.order_id], references: [orders.id] }),
     user: one(users, { fields: [comment.user_id], references: [users.id] }),
}));

// Driver Relations
const driverRelations = relations(driver, ({ one, many }) => ({
    user: one(users, { fields: [driver.user_id], references: [users.id] }),
    orders: many(orders),
}));

// MenuItem Relations
const menuItemRelations = relations(menu_item, ({ one, many }) => ({
    restaurant: one(restaurant, { fields: [menu_item.restaurant_id], references: [restaurant.id] }),
    category: one(category, { fields: [menu_item.category_id], references: [category.id] }),
    orderMenuItems: many(order_menu_item),
}));

// OrderMenuItem Relations
const orderMenuItemRelations = relations(order_menu_item, ({ one }) => ({
    order: one(orders, { fields: [order_menu_item.order_id], references: [orders.id] }),
    menuItem: one(menu_item, { fields: [order_menu_item.menu_item_id], references: [menu_item.id] }),
}));

// OrderStatus Relations
const orderStatusRelations = relations(order_status, ({ one }) => ({
    order: one(orders, { fields: [order_status.order_id], references: [orders.id] }),
    statusCatalog: one(status_catalog, { fields: [order_status.status_catalog_id], references: [status_catalog.id] }),
}));

// Orders Relations
const ordersRelations = relations(orders, ({ one, many }) => ({
    restaurant: one(restaurant, { fields: [orders.restaurant_id], references: [restaurant.id] }),
    deliveryAddress: one(address, { fields: [orders.delivery_address_id], references: [address.id] }),
    user: one(users, { fields: [orders.user_id], references: [users.id] }),
    driver: one(driver, { fields: [orders.driver_id], references: [driver.id] }),
    orderMenuItems: many(order_menu_item),
    orderStatuses: many(order_status),
}));

// Restaurant Relations
const restaurantRelations = relations(restaurant, ({ one, many }) => ({
    city: one(city, { fields: [restaurant.city_id], references: [city.id] }),
    menuItems: many(menu_item),
    orders: many(orders),
    owners: many(restaurant_owner),
}));

// State Relations
const stateRelations = relations(state, ({ many }) => ({
    cities: many(city),
}));

// StatusCatalog Relations
const statusCatalogRelations = relations(status_catalog, ({ many }) => ({
    orderStatuses: many(order_status),
}));

// Users Relations
const usersRelations = relations(users, ({ many }) => ({
    addresses: many(address),
    comments: many(comment),
    drivers: many(driver),
    orders: many(orders),
    restaurantOwners: many(restaurant_owner),
}));

// RestaurantOwner Relations
const restaurantOwnerRelations = relations(restaurant_owner, ({ one }) => ({
    restaurant: one(restaurant, { fields: [restaurant_owner.restaurant_id], references: [restaurant.id] }),
    owner: one(users, { fields: [restaurant_owner.owner_id], references: [users.id] }),
}));



//aliases for insert and select operations
export type TIAddress = typeof address.$inferInsert;
export type TSAddress = typeof address.$inferSelect;

export type TICategory = typeof category.$inferInsert;
export type TSCategory = typeof category.$inferSelect;

export type TICity = typeof city.$inferInsert;
export type TSCity = typeof city.$inferSelect;

export type TIComment = typeof comment.$inferInsert;
export type TSComment = typeof comment.$inferSelect;

export type TIDriver = typeof driver.$inferInsert;
export type TSDriver = typeof driver.$inferSelect;

export type TIMenuItem = typeof menu_item.$inferInsert;
export type TSMenuItem = typeof menu_item.$inferSelect;

export type TIOrderMenuItem = typeof order_menu_item.$inferInsert;
export type TSOrderMenuItem = typeof order_menu_item.$inferSelect;

export type TIOrderStatus = typeof order_status.$inferInsert;
export type TSOrderStatus = typeof order_status.$inferSelect;

export type TIOrders = typeof orders.$inferInsert;
export type TSOrders = typeof orders.$inferSelect;

export type TIRestaurant = typeof restaurant.$inferInsert;
export type TSRestaurant = typeof restaurant.$inferSelect;

export type TIState = typeof state.$inferInsert;
export type TSState = typeof state.$inferSelect;

export type TIStatusCatalog = typeof status_catalog.$inferInsert;
export type TSStatusCatalog = typeof status_catalog.$inferSelect;

export type TIUsers = typeof users.$inferInsert;
export type TSUsers = typeof users.$inferSelect;

export type TIRestaurantOwner = typeof restaurant_owner.$inferInsert;
export type TSRestaurantOwner = typeof restaurant_owner.$inferSelect;

export type TIAuthOnUsersTable = typeof AuthOnUsersTable.$inferInsert;
export type TSAuthOnUsersTable = typeof AuthOnUsersTable.$inferSelect;
