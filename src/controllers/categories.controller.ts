import { Request, Response } from "express";

import Category from '../models/Category'

export const createCategories = async (req: Request, res: Response) => {
    if(!req.body.categories || !req.body.categories.length)
        return res.sendStatus(400);
    
    //If we get a string category, convert it to an array
    if(!Array.isArray(req.body.categories))
        req.body.categories = [req.body.categories];

    //Returns 400 if any category already exists
    for(const category_name of req.body.categories) {
        const category: Category | null = await Category.findOne({where: {category_name: category_name}})

        if(category)
            return res.sendStatus(400);
    };

    req.body.categories.forEach(async (category: string) => {
        await Category.create({category_name: category});
    });

    return res.sendStatus(201);
}

export const getCategories = async (req: Request, res: Response) => {
    const categories: Category[] | null = await Category.findAll();

    return res.json(categories);
}

export const deleteCategory = async (req: Request, res: Response) => {
    if(req.query.category === 'Default')
        return res.sendStatus(400);

    const result: number = await Category.destroy({where: {category_name: req.query.category}});

    if(!result)
        return res.sendStatus(400);

    return res.sendStatus(200);
}