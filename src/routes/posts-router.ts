import {Request, Response, Router} from "express";
import {IPost} from "../interfaces/global_interfaces";
import {postsRepository} from "../repositories/posts-repository";
import {idValidation, postsIdValidation, postsValidationMiddleware, validation} from "../middlewares/middlewares";
import {checkSchema} from "express-validator";


export const postsRouter = Router()

postsRouter.get('', (req, res) => {
    const posts: IPost[] = postsRepository.getAllPosts()
    res.json(posts)
})

postsRouter.get('/:id',
    postsIdValidation,
    idValidation,
    (req, res) => {
        const id = Number(req.params.id)
        const post = postsRepository.getPostById(id)
        res.json(post)
    })

postsRouter.post('',
    checkSchema(postsValidationMiddleware),
    validation,
    (req: Request, res: Response) => {
        const {title, shortDescription, content, bloggerId} = req.body
        const newPost = postsRepository.createPost(title, shortDescription, content, bloggerId)
        res.status(201).json(newPost)
    })

postsRouter.put('/:id',
    postsIdValidation,
    idValidation,
    checkSchema(postsValidationMiddleware),
    validation,
    (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const {title, shortDescription, content, bloggerId} = req.body
        postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
        res.sendStatus(204)
    })

postsRouter.delete('/:id',
    postsIdValidation,
    idValidation,
    (req: Request, res: Response) => {
        const id = Number(req.params.id)
        postsRepository.deletePostById(id)
        res.sendStatus(204)

    })
