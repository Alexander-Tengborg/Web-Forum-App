import { Request, Response } from "express";
import passport from "passport";
import { Op } from "sequelize";

import User from "../models/User";
import { validateUserData } from '../utils/user.utils';

export const registerUser = async (req: Request, res: Response) => {
    if(!validateUserData(req.body.email, req.body.username, req.body.password))
        return res.sendStatus(400);

    const emailOrUsernameExists: User | null = await User.findOne(
        {where: {
            [Op.or]: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        }});

    if(emailOrUsernameExists)
        return res.sendStatus(418);

    await User.create(req.body);
    
    return res.sendStatus(201);
};

//check err instead of user
export const loginUser = (req: Request, res: Response) => {
    passport.authenticate('local', (err: any, user: Express.User, info: any, status: any) => {
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
};