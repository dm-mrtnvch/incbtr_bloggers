import {Request, Response, Router} from "express";
import {IPost} from "../interfaces/global_interfaces";
import {postsRepository} from "../repositories/posts-repository";
import {
    authMiddleware,
    idValidation, oneOfIdValidation,
    postsIdValidation, postsIdValidationAsync,
    postsValidationSchema,
    validation
} from "../middlewares/middlewares";
import {checkSchema} from "express-validator";
import {postsService} from "../domain/posts-service";
import {getPaginationData} from "../helpers/utils";


export const postsRouter = Router()

postsRouter.get('',
    async (req, res) => {
        const {page, pageSize, searchNameTerm} =  getPaginationData(req.query)
        const posts: IPost[] = await postsService.getAllPosts(page, pageSize, searchNameTerm)
        res.json(posts)
    })

postsRouter.get('/:postId',
    oneOfIdValidation,
    idValidation,
    async (req, res) => {
        const id = Number(req.params.postId)
        const post = await postsService.getPostById(id)
        res.json(post)
    })

postsRouter.post('',
    authMiddleware,
    checkSchema(postsValidationSchema),
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

postsRouter.put('/:postId',
    authMiddleware,
    oneOfIdValidation,
    idValidation,
    checkSchema(postsValidationSchema),
    validation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.postId)
        const {title, shortDescription, content, bloggerId} = req.body
        const isUpdated = await postsService.updatePost(id, title, shortDescription, content, bloggerId)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.delete('/:postId',
    authMiddleware,
    postsIdValidationAsync,
    idValidation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.postId)
        await postsService.deletePostById(id)
        res.sendStatus(204)
    })
