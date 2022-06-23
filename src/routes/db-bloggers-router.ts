import {Request, Response, Router} from "express";
import {checkSchema} from "express-validator";
import {
    idValidation,
    bloggersIdValidation,
    validation,
    bloggersValidationSchema, oneOfIdValidation, authMiddleware, paginationValidation, postsValidationSchema
} from "../middlewares/middlewares";
import {bloggersService} from "../domain/bloggers-service";
import {getPaginationData} from "../helpers/utils";
import {postsService} from "../domain/posts-service";


export const bloggersRouter = Router()

bloggersRouter.get('',
    paginationValidation,
    validation,
    async (req: Request, res: Response) => {
        const {page, pageSize, searchNameTerm} = getPaginationData(req.query)
        const bloggers = await bloggersService.getAllBloggers(page, pageSize, searchNameTerm)
        res.json(bloggers)
    })

bloggersRouter.get('/:bloggerId',
    oneOfIdValidation,
    idValidation,
    async (req: Request, res: Response) => {
        const bloggerId = Number(req.params.bloggerId)
        const blogger = await bloggersService.getBloggerById(bloggerId)
        res.json(blogger)
    })

bloggersRouter.post('',
    authMiddleware,
    checkSchema(bloggersValidationSchema),
    validation,
    async (req: Request, res: Response) => {
        const {name, youtubeUrl} = req.body
        const newBlogger = await bloggersService.createBlogger(name, youtubeUrl)
        res.status(201).json(newBlogger)
    })

bloggersRouter.post('/:bloggerId/posts',
    authMiddleware,
    oneOfIdValidation,
    idValidation,
    checkSchema(postsValidationSchema),
    validation,
    async (req: Request, res: Response) => {
    const bloggerId = Number(req.params.bloggerId)
        const {title, shortDescription, content} = req.body
        const newPost = await postsService.createPost(title, shortDescription, content, bloggerId)
        console.log(newPost)
        if(newPost){
            res.status(201).json(newPost)
        } else {
            res.sendStatus(404)
        }
    })

bloggersRouter.put('/:bloggerId',
    authMiddleware,
    oneOfIdValidation,
    idValidation,
    checkSchema(bloggersValidationSchema),
    validation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.bloggerId)
        const {name, youtubeUrl} = req.body
        const isUpdated = await bloggersService.updateBlogger(id, name, youtubeUrl)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)  // ?
        }
    })


bloggersRouter.delete('/:bloggerId',
    authMiddleware,
    oneOfIdValidation,
    idValidation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.bloggerId)
        const isDeleted = await bloggersService.deleteBloggerById(id)
        if (isDeleted) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

