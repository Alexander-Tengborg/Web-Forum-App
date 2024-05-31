import express, { Router } from "express";

import { createCategories, getCategories, deleteCategory } from "../controllers/categories.controller";
import { isLoggedIn, isAdmin } from '../middlewares/authorization';

const categoriesRouter: Router = express.Router();

categoriesRouter.post('/', isAdmin, createCategories);
categoriesRouter.get('/', isLoggedIn, getCategories);
categoriesRouter.delete('/', isAdmin, deleteCategory);

export default categoriesRouter;