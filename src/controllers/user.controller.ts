import { Request, Response } from "express";
import passport from "passport";
import { isEmail, isStrongPassword } from "validator";
import { Op } from "sequelize";

import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
    if(!isEmail(req.body.email) || !isStrongPassword(req.body.password)) {
        return res.sendStatus(400);
    }

    const emailOrUsernameExists = await User.findOne({where: {[Op.or]: [{ email: req.body.email }, { username: req.body.username }]}});
    if(emailOrUsernameExists) {
        return res.sendStatus(418);
    }

    //What happens if we get some error and the user does not get created?
    const createdUser = await User.create(req.body);
    
    if(createdUser) {
        return res.status(201).send("Created");
    }
};

//check err instead of user
export const loginUser = (req: Request, res: Response) => {
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
};