import 'dotenv/config';

import express, { Express, Request, Response } from "express";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import cors from 'cors';

import userRouter from "./routes/user.routes";

import database from './database';
import User from './models/User';

const app: Express = express();

app.use(express.json())
app.use(cors());

app.use(session({
    name: "session",
    secret: process.env.SESSION_SECRET || "ADD SECRET HERE OR TO AS AN ENVIRONMENT VARIABLE",
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

passport.use(new LocalStrategy.Strategy(async (_username, _password, done) => {
    const result = await User.findOne({where: {username: _username, password: _password}});
    if(result) {
        return done(null, result);
    }
    done(null, false);
}));

//FIX user: any
passport.serializeUser((user: any, done) => {
    done(null, {
        id: user.id,
        email: user.email,
        username: user.username,
    })
});

passport.deserializeUser((user: any, done) => {
        done(null, user);
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/user', userRouter);

(async () => {
    try {
        await database.sync();
        // await database.sync({alter: true});
        app.listen(process.env.API_LISTENING_PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.API_LISTENING_PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();