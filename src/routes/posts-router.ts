import {Request, Response, Router} from "express";
import {IPost} from "../interfaces/global_interfaces";
import {postsRepository} from "../repositories/posts-repository";
import {
    authMiddleware,
    idValidation,
    postsIdValidation,
    postsValidationSchema,
    validation
} from "../middlewares/middlewares";
import {checkSchema} from "express-validator";


export const postsRouter = Router()

postsRouter.get('',
    async (req, res) => {
        const posts: IPost[] = await postsRepository.getAllPosts()
        res.json(posts)
    })

postsRouter.get('/:id',
    postsIdValidation,
    idValidation,
    async (req, res) => {
        const id = Number(req.params.id)
        const post = await postsRepository.getPostById(id)
        res.json(post)
    })

postsRouter.post('',
    authMiddleware,
    checkSchema(postsValidationSchema),
    validation,
    async (req: Request, res: Response) => {
        const {title, shortDescription, content, bloggerId} = req.body
        const newPost = await postsRepository.createPost(title, shortDescription, content, bloggerId)
        res.status(201).json(newPost)
    })

postsRouter.put('/:id',
    authMiddleware,
    postsIdValidation,
    idValidation,
    checkSchema(postsValidationSchema),
    validation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const {title, shortDescription, content, bloggerId} = req.body
        await postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
        res.sendStatus(204)
    })

postsRouter.delete('/:id',
    authMiddleware,
    postsIdValidation,
    idValidation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        await postsRepository.deletePostById(id)
        res.sendStatus(204)

    })
