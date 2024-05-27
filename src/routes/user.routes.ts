import express, { Router, Request, Response } from "express";

import User from "../models/User";

import { registerUser, loginUser } from "../controllers/user.controller";

const userRouter: Router = express.Router();

userRouter.post('/register', registerUser);

userRouter.get('/da', async (req: Request, res: Response) => {
    const result = await User.findAll();
    res.send(result);
});

userRouter.post('/login', loginUser);

export default userRouter;