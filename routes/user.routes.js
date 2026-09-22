import {Router} from 'express';

const userRouter = Router();

userRouter.get('/users', (req, res) => {
  res.send({title: "User profile route"});
});

userRouter.get('/:id', (req, res) => {
  res.send({title: "User profile route through id"});
});

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