import {Request, Response, Router} from "express";
import {IPost} from "../interfaces";
import {posts} from "../db/mock_data";
import {postsRepository} from "../repositories/posts-repository";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {error} from "../config";

export const postsRouter = Router()

postsRouter.get('', (req, res) => {
    const posts: IPost[] = postsRepository.getAllPosts()
    res.json(posts)
})

postsRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const post = postsRepository.getPostById(id)
    if (post) {
        res.json(post)
        return
    } else {
        res.sendStatus(404)
    }
})

postsRouter.post('', (req: Request, res: Response) => {
    const {title, shortDescription, content, bloggerId} = req.body

    const blogger = bloggersRepository.getBloggerById(bloggerId)
    if(!blogger){
        res.status(400).send(error)
        return
    }
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
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const isDeleted = postsRepository.deletePostById(id)
    if (isDeleted) {
        res.sendStatus(204)
        return
    } else {
        res.send(404)
    }
})