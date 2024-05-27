import express, { Router } from "express";

import { createCategories, getCategories } from "../controllers/categories.controller";
import { isLoggedIn, isAdmin } from '../middlewares/authorization';

const categoriesRouter: Router = express.Router();

categoriesRouter.post('/', isAdmin, createCategories);
categoriesRouter.get('/', isLoggedIn, getCategories);

export default categoriesRouter;