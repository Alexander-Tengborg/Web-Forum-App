import { Request, Response } from "express";

import Category from '../models/Category'

export const createCategories = async (req: Request, res: Response) => {
    if(!req.body.categories || !req.body.categories.length) {
        return res.sendStatus(400);
    }
    
    if(!Array.isArray(req.body.categories)) {
        req.body.categories = [req.body.categories];
    }

    for(const _category_name of req.body.categories) {
        const category = await Category.findOne({where: {category_name: _category_name}})
        if(category) {
            return res.sendStatus(400);
        }
    };

    req.body.categories.forEach(async category => {
        await Category.create({category_name: category});
    });

    res.sendStatus(201);
}

export const getCategories = async (req: Request, res: Response) => {
    const categories = await Category.findAll();

    res.json(categories);
}

export const deleteCategory = async (req: Request, res: Response) => {
    if(req.query.category === 'Default') {
        return res.sendStatus(400);
    }

    const result = await Category.destroy({where: {category_name: req.query.category}});
    if(!result) {
        return res.sendStatus(400);
    }

    res.sendStatus(200);
}