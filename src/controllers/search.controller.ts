import { Request, Response } from "express";
import { Op } from 'sequelize';

import Thread from "../models/Thread";
import Post from "../models/Post";
import { processResults } from '../utils/search.utils';

export const searchForum = async (req: Request, res: Response) => {
    if(!req.query.text || req.query.text == "")
        return res.sendStatus(400);

    //Search thread titles
    const threadTitles: Thread[] | null = await Thread.findAll({
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

    //Search thread text
    const threadTexts: Thread[] | null = await Thread.findAll({
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

    //Search post text
    const posts: Post[] | null = await Post.findAll({
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
    if(!allResults.length)
        return res.sendStatus(404);

    //TODO Fix as string
    const processedResults = processResults(allResults, req.query.text as string);

    return res.json(processedResults);
}