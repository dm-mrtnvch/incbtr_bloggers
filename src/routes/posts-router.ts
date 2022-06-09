import {Request, Response, Router} from "express";
import {IBlogger, IPost, IPostViewModel} from "../interfaces";
import {bloggers, posts} from "../db/mock_data";
import {postsRepository} from "../repositories/posts-repository";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {error} from "../config";
import {findPostById} from "../helpers/utils";
import {bloggersRouter} from "./bloggers-router";

export const postsRouter = Router()

postsRouter.get('', (req, res) => {
    const posts: IPost[] = postsRepository.getAllPosts()
    res.json(posts)
})

postsRouter.get('/:id', (req, res) => {
    const postId = Number(req.params.id)
    const post = postsRepository.getPostById(postId)
    if (post) {
        res.json(post)
    } else {
        res.send(404)
    }
})

postsRouter.post('', (req: Request, res: Response) => {
    const {title, shortDescription, content, bloggerId} = req.body

    const blogger: any = bloggersRepository.getBloggerById(bloggerId)
    const bloggerName = blogger?.name

    if (title && shortDescription && content && bloggerId) {
        const newPost: IPost = {
            id: Number(new Date()),
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName
        }
        posts.push(newPost)
        res.status(201).json(newPost)
        return
    }
    res.status(400).send(error)
})

postsRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const {title, shortDescription, content, bloggerId} = req.body
    const isUpdated = postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    if (isUpdated) {
        res.send(204)
    } else {
        res.send(404)
    }
})

postsRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const isDeleted = postsRepository.deletePostById(id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})