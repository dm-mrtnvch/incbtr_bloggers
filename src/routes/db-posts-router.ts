import {Request, Response, Router} from "express";
import {IPost} from "../interfaces/global_interfaces";
import {postsRepository} from "../repositories/posts-repository";
import {
    authMiddleware,
    idValidation,
    postsIdValidation,
    postsValidationMiddleware,
    validation
} from "../middlewares/middlewares";
import {checkSchema} from "express-validator";
import {postsService} from "../domain/posts-service";


export const postsRouter = Router()

postsRouter.get('',
    async (req, res) => {
        const posts: IPost[] = await postsService.getAllPosts()
        res.json(posts)
    })

postsRouter.get('/:id',
    postsIdValidation,
    idValidation,
    async (req, res) => {
        const id = Number(req.params.id)
        const post = await postsService.getPostById(id)
        res.json(post)
    })

postsRouter.post('',
    authMiddleware,
    checkSchema(postsValidationMiddleware),
    validation,
    async (req: Request, res: Response) => {
        const {title, shortDescription, content, bloggerId} = req.body
        const newPost = await postsService.createPost(title, shortDescription, content, bloggerId)
        if(newPost) {
            res.status(201).json(newPost)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.put('/:id',
    authMiddleware,
    postsIdValidation,
    idValidation,
    checkSchema(postsValidationMiddleware),
    validation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const {title, shortDescription, content, bloggerId} = req.body
        const isUpdated = await postsService.updatePost(id, title, shortDescription, content, bloggerId)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.delete('/:id',
    authMiddleware,
    postsIdValidation,
    idValidation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        await postsService.deletePostById(id)
        res.sendStatus(204)
    })
