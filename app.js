import express from "express";

import {PORT, NODE_ENV} from "./config/env.js";
import authRouter from "./routes/auth.router.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

//forward slahes to the routers

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, async () =>{
  console.log(`Server is running on port ${PORT}`);

  await connectToDatabase(); // Connect to the database when the server starts
});

export default app;