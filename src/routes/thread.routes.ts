import express, { Router } from "express";

import { createThread, getThreads } from "../controllers/thread.controller";
import { isLoggedIn, isAdmin } from '../middlewares/authorization';

const threadRouter: Router = express.Router();

threadRouter.post('/', isLoggedIn, createThread);
threadRouter.get('/', isLoggedIn, getThreads);

export default threadRouter;