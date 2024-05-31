import express, { Router } from "express";

import userRouter from "./user.routes";
import categoriesRouter from './categories.routes';
import threadRouter from './thread.routes';
import searchRouter from './search.routes';
import csvRouter from './csv.routes';

const router: Router = express.Router();

router.use('/user', userRouter);
router.use('/categories', categoriesRouter);
router.use('/thread', threadRouter);
router.use('/search', searchRouter);
router.use('/csv', csvRouter);

export default router;