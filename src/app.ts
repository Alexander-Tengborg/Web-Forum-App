import 'dotenv/config';

import express, { Express, Request, Response } from "express";
import userRouter from "./routes/user.routes";

import database from './database';

const app: Express = express();

app.use(express.json())

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