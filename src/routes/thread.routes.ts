import express, { Router } from "express";

import { createThread, getThreads, deleteThread } from "../controllers/thread.controller";
import { isLoggedIn, isAdmin } from '../middlewares/authorization';
import postRouter from './post.routes';

const threadRouter: Router = express.Router();

threadRouter.post('/', isLoggedIn, createThread);
threadRouter.get('/', isLoggedIn, getThreads);
threadRouter.delete('/', isAdmin, deleteThread);

threadRouter.use('/post', postRouter);

export default threadRouter;