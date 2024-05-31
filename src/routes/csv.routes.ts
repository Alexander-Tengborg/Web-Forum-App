import express, { Router } from "express";

import { registerUsers } from "../controllers/csv.controller";
import { isLoggedIn, isAdmin } from '../middlewares/authorization';

const csvRouter: Router = express.Router();

csvRouter.post('/', isAdmin, express.raw({type: 'text/csv'}), registerUsers);
export default csvRouter;