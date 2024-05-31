import { Request, Response } from "express";

import Category from '../models/Category'
import Thread from "../models/Thread";

import { Op } from 'sequelize';
import Post from "../models/Post";

import { processResults } from '../utils/search.utils';

export const searchForum = async (req: Request, res: Response) => {
    if(!req.query.text || req.query.text == "") {
        return res.sendStatus(400);
    }

    //search thread titles
    const threadTitles = await Thread.findAll({
        where: {
            title: {
                [Op.like]: `%${req.query.text}%`
            }
        },
        attributes: [
            'id',
            ['title', 'text']
        ]
    });

    //search thread text
    const threadTexts = await Thread.findAll({
        where: {
            text: {
                [Op.like]: `%${req.query.text}%`
            }
        },
        attributes: [
            'id',
            'text'
        ]
    });

    //search post text
    const posts = await Post.findAll({
        where: {
            text: {
                [Op.like]: `%${req.query.text}%`
            }
        },
        attributes: [
            ['threadId', 'id'],
            'text'
        ]
    });

    const allResults = [...threadTitles, ...threadTexts, ...posts];
    if(!allResults.length) {
        return res.sendStatus(404);
    }

    const processedResults = processResults(allResults, req.query.text);

    res.json(processedResults);
}