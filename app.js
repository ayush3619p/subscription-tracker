import express from "express";

import {PORT, NODE_ENV} from "./config/env.js";

import authRouter from "./routes/auth.router.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";

import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";

import errorHandler  from "./middleware/error.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

//forward slahes to the routers

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, async () =>{
  console.log(`Server is running on port ${PORT}`);

  await connectToDatabase(); // Connect to the database when the server starts
});

export default app;