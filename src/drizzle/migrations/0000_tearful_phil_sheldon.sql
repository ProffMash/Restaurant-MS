DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'driver', 'restaurant_owner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_on_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"password" varchar(255),
	"username" varchar(255),
	"role" "role" DEFAULT 'user'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"street_address_1" varchar(50) NOT NULL,
	"street_address_2" varchar(50),
	"zip_code" varchar(15) NOT NULL,
	"delivery_instructions" varchar(100),
	"user_id" integer NOT NULL,
	"city_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"state_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"comment_text" varchar(100) NOT NULL,
	"is_complaint" boolean NOT NULL,
	"is_praise" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "driver" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_make" varchar(20) NOT NULL,
	"car_model" varchar(20) NOT NULL,
	"car_year" integer NOT NULL,
	"user_id" integer NOT NULL,
	"online" boolean NOT NULL,
	"delivering" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"restaurant_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"description" varchar(100) NOT NULL,
	"ingredients" varchar(50) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"active" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"menu_item_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"item_price" numeric(10, 2) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"comment" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"status_catalog_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer NOT NULL,
	"estimated_delivery_time" timestamp,
	"actual_delivery_time" timestamp,
	"delivery_address_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"driver_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"discount" numeric(10, 2) NOT NULL,
	"final_price" numeric(10, 2) NOT NULL,
	"comment" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"street_address" varchar(50) NOT NULL,
	"zip_code" varchar(20) NOT NULL,
	"city_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant_owner" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer NOT NULL,
	"owner_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "state" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"code" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status_catalog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"contact_phone" varchar(15) NOT NULL,
	"phone_verified" boolean NOT NULL,
	"email" varchar(50) NOT NULL,
	"email_verified" boolean NOT NULL,
	"confirmation_code" varchar(15),
	"password" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_on_users" ADD CONSTRAINT "auth_on_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "city" ADD CONSTRAINT "city_state_id_state_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "driver" ADD CONSTRAINT "driver_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_menu_item_id_menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_status_catalog_id_status_catalog_id_fk" FOREIGN KEY ("status_catalog_id") REFERENCES "public"."status_catalog"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_address_id_address_id_fk" FOREIGN KEY ("delivery_address_id") REFERENCES "public"."address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_driver_id_driver_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."driver"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
