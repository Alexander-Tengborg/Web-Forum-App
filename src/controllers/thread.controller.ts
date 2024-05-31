import { Request, Response } from "express";
import { Op } from 'sequelize';

import Category from '../models/Category'
import Thread from "../models/Thread";

//TODO MOVE/REMOVE?
interface CreateThreadQuery {
    category: string,
    author: string,
    text: string
};

//TODO fix user!
export const createThread = async (req: Request, res: Response) => {
    if(!req.body.category || !req.body.title || !req.body.openingPost || !req.body.openingPost.text || req.body.title.length == 0)
        return res.sendStatus(400);

    const category: Category | null = await Category.findOne({where: {category_name: req.body.category}});

    if(!category)
        return res.sendStatus(404);

    let threadSettings: CreateThreadQuery = {
        category: category.category_name,
        author: req.user!.username,
        text: req.body.openingPost.text
    };


    await Thread.create({ ...threadSettings });

    return res.sendStatus(201);
}

export const getThreads = async (req: Request, res: Response) => {
    let query = {};

    if(req.query.categories) {
        let categories: any;

        if(typeof req.query.categories === 'string')
            categories = [req.query.categories]; 
        else
            categories = req.query.categories;
        
        
        query['where']['category'] = {
            [Op.in]: categories
        };
    }

    if(req.query.author) {
        let authors: any;
        if(typeof req.query.author === 'string')
            authors = [req.query.author]; 
        else
            authors = req.query.author;
        
        
        query['where']['author'] = {
            [Op.in]: authors
        };
    }

    if(req.query.newest_first == 'true')
        query['order'] = [
            ['id', 'DESC']
        ];
    else
        query['order'] = [
            ['id', 'ASC']
        ];

    if(
        req.query.page_size && typeof req.query.page_size === 'string' && parseInt(req.query.page_size) &&
        req.query.page && typeof req.query.page === 'string' && parseInt(req.query.page)
    ) {
        query['limit'] = parseInt(req.query.page_size);
        query['offset'] = parseInt(req.query.page) * query['limit'];
    }

    const threads: Thread[] | null = await Thread.findAll(query);

    if(!threads.length)
        return res.sendStatus(404);

    return res.json({'threads': threads});
}

export const deleteThread = async (req: Request, res: Response) => {
    const result: number = await Thread.destroy({where: {id: req.query.id}});

    if(!result)
        return res.sendStatus(404);

    return res.sendStatus(204);
}