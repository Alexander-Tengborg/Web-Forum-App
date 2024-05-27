import express, { Router, Request, Response } from "express";

import User from "../models/User";

import { registerUser, loginUser } from "../controllers/user.controller";
import passport from "passport";

const userRouter: Router = express.Router();

userRouter.post('/register', registerUser);

userRouter.get('/protected', async (req: Request, res: Response) => {
    if(!req.isAuthenticated())
        return res.sendStatus(401);
    const result = await User.findAll();
    res.send(result);
});

//check err instead of user
userRouter.post('/login', (req: Request, res: Response) => {
    passport.authenticate('local', (err, user, info, status) => {
        if(!user) {
            console.log(err);
            return res.sendStatus(401);
        }

        req.login(user, (err) => {
            if(err) {
                console.error("Error logging in");
                return res.sendStatus(401);
            }

            res.sendStatus(200);
        })

    })(req, res);
});

// userRouter.post('/login', (req: Request, res: Response) => {
//     passport.authenticate('local', (err, user, info, status) => {
//         if(!user) {
//             console.log(req.session);
//             return res.sendStatus(401);
//         }

//         console.log(req.session);
//         res.sendStatus(200);
//     })(req, res);
// });

export default userRouter;