import express, { Router } from "express";

import { createPosts, getPosts } from "../controllers/post.controller";
import { isLoggedIn, isAdmin } from '../middlewares/authorization';

const postRouter: Router = express.Router();

postRouter.post('/', isLoggedIn, createPosts);
postRouter.get('/', isLoggedIn, getPosts);

export default postRouter;