import express, { Router } from "express";

import { searchForum } from "../controllers/search.controller";
import { isLoggedIn } from "../middlewares/authorization";

const searchRouter: Router = express.Router();

searchRouter.get('/', isLoggedIn, searchForum);

export default searchRouter;