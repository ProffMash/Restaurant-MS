import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import "dotenv/config";
import { cityRouter } from './city/city.router';
import { usersRouter } from './users/users.router';
import { driverRouter } from './driver/driver.router';
import { restaurantRouter } from './restaurant/restaurant.router'; 
import { categoryRouter } from './category/category.router';
import { addressRouter } from './address/address.router';
import { restaurant_ownerRouter } from './restaurant_owner/restaurant_owner.router';
import { menuItemsRouter } from './menu_item/menu_item.router';
import { commentsRouter } from './comment/comment.router';
import { ordersRouter } from './orders/orders.router';
import { authRouter } from './auth/auth.router';
import { readFileSync } from 'fs';
import cron from 'node-cron'
import { mailFunction } from './mailer/mail';

const app = new Hono();

// Route definitions
app.route("/city", cityRouter);
app.route("/users", usersRouter);
app.route("/driver", driverRouter);
app.route("/restaurant", restaurantRouter);
app.route("/category", categoryRouter);
app.route("/address", addressRouter);
app.route("/restaurant_owner", restaurant_ownerRouter);
app.route("/menu_item", menuItemsRouter);
app.route("/comment", commentsRouter);
app.route("/orders", ordersRouter);
app.route("auth/", authRouter);

// Health check endpoint
app.get('/', async(c)=>{
  try{
  // return c.html(readFileSync('./index.html', 'utf8'))
  let html = readFileSync('./index.html', 'utf8');
  return c.html(html)
}catch(error :any){
  return c.json({error :error.message, status: 500})
}}
)
// Error handling middleware
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.text('Internal Server Error', 500);
});

// 404 handler
app.notFound((c) => {
  return c.text('Not Found!', 404);
});

// Start the server
const port = process.env.PORT || 8000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});


//hello world every minute with cron
// cron.schedule('*/2 * * * * *', () => {
//   console.log('happy fathers Day');
// });

mailFunction('example@example.com', 'Test Subject', 'This is a test email.');