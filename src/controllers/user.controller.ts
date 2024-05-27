import { Request, Response } from "express";

import User from "../models/User";

import { isEmail, isStrongPassword } from "validator";

export const registerUser = async (req: Request, res: Response) => {
    if(!isEmail(req.body.email) || !isStrongPassword(req.body.password)) {
        return res.status(400).send("Bad Request");
    }

    //Can use Op.or and do both of the following queries in one instead
    const emailExists = await User.findOne({where: { email: req.body.email }});
    if(emailExists) {
        return res.status(418).send("I'm a teapot");
    }

    const usernameExists = await User.findOne({where: { username: req.body.username }});
    if(usernameExists) {
        return res.status(418).send("I'm a teapot");
    }

    //What happens if we get some error and the user does not get created?
    const createdUser = await User.create(req.body);
    if(createdUser) {
        return res.status(201).send("Created");
    }
};

export const loginUser = async (req: Request, res: Response) => {

};