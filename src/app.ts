import 'dotenv/config';

import express, { Express, Request, Response } from "express";
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

import userRouter from "./routes/user.routes";
import categoriesRouter from './routes/categories.routes';
import threadRouter from './routes/thread.routes';
import searchRouter from './routes/search.routes';
import csvRouter from './routes/csv.routes';

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
passport.serializeUser((user, done) => serializeUser(user, done));
passport.deserializeUser((user: any, done) => deserializeUser(user, done));

app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/thread', threadRouter);
app.use('/search', searchRouter);
app.use('/csv', csvRouter);

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