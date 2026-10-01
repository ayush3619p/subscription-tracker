import {Router} from 'express';

import authorize from '../middleware/auth.middleware.js'

import { getUsers, getUser } from '../controllers/user.controller.js';

const userRouter = Router();

// Get all users route- /api/v1/users/users
userRouter.get('/users', getUsers);

// Get a user by ID route- /api/v1/users/:id
userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => {
  res.send({title: "User profile route create"});
});

userRouter.put('/:id', (req, res) => {
  res.send({title: "User profile route edit through id"});
});

userRouter.delete('/:id', (req, res) => {
  res.send({title: "User profile route delete through id"});
});

export default userRouter;