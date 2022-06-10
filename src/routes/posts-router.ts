import {Request, Response, Router} from "express";
import {IError, IPost} from "../interfaces";
import {posts} from "../db/mock_data";
import {postsRepository} from "../repositories/posts-repository";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {error} from "../config";
import {validName} from "../helpers/utils";

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

    const errors: IError = {errorsMessages: []}
    const isValidTitle = validName(title)
    const isValidShortDescription =  validName(shortDescription)
    const isValidSContent =  validName(content)
    if (!isValidTitle || !title?.trim()) {
        errors.errorsMessages.push({message: 'incorrect field', field: "title"});
    }
    if (!isValidShortDescription || !shortDescription?.trim()) {
        errors.errorsMessages.push({message: 'incorrect field', field: "shortDescription"});
    }
    if (!isValidSContent || !content?.trim()) {
        errors.errorsMessages.push({message: 'incorrect field', field: "content"});
    }



    const blogger = bloggersRepository.getBloggerById(bloggerId)
    if(!blogger){
        errors.errorsMessages.push({message: 'incorrect field', field: "bloggerId"});
    }


    const bloggerName = blogger?.name
    console.log(bloggerName)
    // const bloggerName = typeof blogger !== "boolean" ? blogger.name : ''
    if(!bloggerName || bloggerName.trim().length < 1){
        errors.errorsMessages.push({message: 'incorrect field', field: "bloggerName"});
    }
    if (errors.errorsMessages.length > 0) {
        res.status(400).send(errors)
        return
    }

        if (title.trim().length > 0
            && shortDescription.trim().length > 0
            && content.trim().length > 0
            && bloggerId) {

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
    res.status(400).send(errors)
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
