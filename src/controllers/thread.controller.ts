import { Request, Response } from "express";


import Category from '../models/Category'
import Thread from "../models/Thread";

import { Op } from 'sequelize';

export const createThread = async (req: Request, res: Response) => {
    if(!req.body.category || !req.body.title || !req.body.openingPost || !req.body.openingPost.text || req.body.title.length == 0) {
        return res.sendStatus(400);
    }

    const category = await Category.findOne({where: {category_name: req.body.category}});
    if(!category) {
        return res.sendStatus(404);
    }

    let threadSettings = req.body;

    threadSettings.category = category.category_name;
    threadSettings.author = req.user;
    threadSettings.text = req.body.openingPost.text;

    const thread = await Thread.create(threadSettings);

    res.send(thread);
}

export const getThreads = async (req: Request, res: Response) => {
    let query = {};

    if(req.query.categories) {
        let categories: any;

        if(typeof req.query.categories === 'string') {
            categories = [req.query.categories]; 
        } else {
            categories = req.query.categories;
        }
        
        query['where']['category'] = {
            [Op.in]: categories
        };
    }

    if(req.query.author) {
        let authors: any;
        if(typeof req.query.author === 'string') {
            authors = [req.query.author]; 
        } else {
            authors = req.query.author;
        }
        
        query['where']['author'] = {
            [Op.in]: authors
        };
    }

    if(req.query.newest_first == 'true') {
        query['order'] = [
            ['id', 'DESC']
        ];
    } else {
        query['order'] = [
            ['id', 'ASC']
        ];  
    }

    if(
        req.query.page_size && typeof req.query.page_size === 'string' && parseInt(req.query.page_size) &&
        req.query.page && typeof req.query.page === 'string' && parseInt(req.query.page)
    ) {
        query['limit'] = parseInt(req.query.page_size);
        query['offset'] = parseInt(req.query.page) * query['limit'];
    }

    const threads = await Thread.findAll(query);

    if(!threads.length) {
        return res.sendStatus(404);
    }

    res.json({'threads': threads});
}