import { Request, Response } from "express";

import Thread from "../models/Thread";
import Post from "../models/Post";

export const createPosts = async (req: Request, res: Response) => {
    if(!req.body.threadId)
        return res.sendStatus(404);

    const thread: Thread | null = await Thread.findOne({where: {id: req.body.threadId}});

    if(!thread)
        return res.sendStatus(404);

    for(const post of req.body.posts) {
        await Post.create({text: post.text, author: req.user, threadId: req.body.threadId});
    }

    return res.sendStatus(201);
}

export const getPosts = async (req: Request, res: Response) => {
    if(!req.query.thread_id)
        return res.sendStatus(404);

    const thread: Thread | null = await Thread.findOne(
        {
            where: {
                id: req.query.thread_id
            },
            include: {
                model: Post, 
                attributes: ['author', 'text', 'createdAt']
            }
        });

    if(!thread)
        return res.sendStatus(404);

    return res.json(thread);
}