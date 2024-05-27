import { Request, Response } from "express";


import Category from '../models/Category'
import Thread from "../models/Thread";

import { Op } from 'sequelize';

export const createThread = async (req: Request, res: Response) => {
    const category = await Category.findOne({where: {category_name: req.body.category}});
    if(!category) {
        return res.sendStatus(404);
    }

    console.log(req.user);

    let threadSettings = req.body;

    threadSettings.category = category.category_name;
    threadSettings.author = req.user;
    threadSettings.text = req.body.openingPost.text;
    // threadSettings.


    const thread = await Thread.create(threadSettings);
    res.send(thread);
}

export const getThreads = async (req: Request, res: Response) => {
    
    if(!req.query.categories) {
        return res.sendStatus(400);
    }

    let categories;
    if(typeof req.query.categories === 'string') {
        categories = [req.query.categories]; 
    } else {
        categories = req.query.categories;
    }

    for(const _category_name of categories) {
        const category = await Category.findOne({where: {category_name: _category_name}});
        if(!category) {
            return res.sendStatus(404);
        }
    }

    // const c = await Category.findAll({where: {id: {[Op.in]: category_ids}}, include: Thread}, );

    const threads = await Thread.findAll({where: {category: {[Op.in]: categories}}});

    // res.json(c);

    res.json({'threads': threads});
}