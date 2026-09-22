import {Router} from 'express';

const authRouter = Router();

authRouter.get('/login', (req, res) => {
  res.send({title: "Login route"});
});

authRouter.get('/signup', (req, res) => {
  res.send({title: "Signup route"});
});

export default authRouter;
