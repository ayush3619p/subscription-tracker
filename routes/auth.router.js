import {Router} from 'express';

import { signIn, signUp, signOut } from '../controllers/auth.controller.js';

const authRouter = Router();


// Login route- /api/v1/auth/login
authRouter.post('/login', signIn);

// Login route- /api/v1/auth/signup
authRouter.post('/signup', signUp);

// Logout route- /api/v1/auth/signout
authRouter.post('/signout', signOut);

export default authRouter;
