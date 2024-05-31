import 'dotenv/config';

import express, { Express } from "express";
import passport, { DoneCallback } from 'passport';
import session from 'express-session';
import cors from 'cors';

import router from './routes/routes';

import database from './database';
import { serializeUser, deserializeUser, localStrategy } from './passport.config';
import Category from './models/Category';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(session({
    name: "session",
    secret: process.env.SESSION_SECRET || "ADD SECRET HERE OR AS AN ENVIRONMENT VARIABLE",
    resave: true,
    saveUninitialized: false,
    cookie: {
        sameSite: "lax",
        secure: "auto",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(localStrategy());
passport.serializeUser((user: Express.User, done: DoneCallback) => serializeUser(user, done));
passport.deserializeUser((user: Express.User, done: DoneCallback) => deserializeUser(user, done));

app.use('/', router);

//Syncs the database and runs the server
(async () => {
    try {
        await database.sync();
        // await database.sync({alter: true});
        // await database.sync({force: true});
        const defaultCategory = await Category.findOne({where: {category_name: 'Default'}});
        if(!defaultCategory)
            await Category.create({category_name: 'Default'});
        app.listen(process.env.API_LISTENING_PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.API_LISTENING_PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();