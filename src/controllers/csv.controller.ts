import { Request, Response } from "express";
import passport from "passport";
import { isEmail, isStrongPassword } from "validator";
import { Op } from "sequelize";

import XLSX from 'xlsx';

import User from "../models/User";

import { validateUserData } from '../utils/user.utils';

export const registerUsers = async (req: Request, res: Response) => {
    let data;
    try {
        const data_csv = XLSX.read(req.body);
        const sheet = data_csv.Sheets[data_csv.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(sheet);
    } catch {
        return res.sendStatus(400);
    }

    if(!data.length) {
        return res.sendStatus(200);
    }

    //Does any duplicate email exist within the csv data?
    let emailSet = new Set();
    const duplicateEmail = data.some((obj: any) => {
        return emailSet.size === emailSet.add(obj['e-mail']).size;
    });

    //Does any username email exist within the csv data?
    let usernameSet = new Set();
    const duplicateUsername = data.some((obj: any) => {
        return usernameSet.size === usernameSet.add(obj['username']).size;
    });

    if(duplicateEmail || duplicateUsername) {
        return res.sendStatus(400);
    }

    //Make sure that no emails exist
    //Can do this using the above sets maybe?
    for(const user of data) {
        const email = user!['e-mail'];
        const username = user!['username'];
        const password = user!['password'];

        if(!validateUserData(email, username, password)) {
            return res.sendStatus(400);
        }

        const emailOrUsernameExists = await User.findOne({
            where: {
                [Op.or]: [
                    {email: email},
                    {username: username}
                ]
            }
        });

        if(emailOrUsernameExists) {
            return res.sendStatus(400);
        }
    }

    //Create users
    for(const user of data) {
        const email = user!['e-mail'];
        const username = user!['username'];
        const password = user!['password'];

        await User.create({email: email, username: username, password: password});

    }

    res.sendStatus(201);
};