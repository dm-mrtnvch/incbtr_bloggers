import {Request, Response, Router} from "express";
import {checkSchema} from "express-validator";
import {
    idValidation,
    bloggersIdValidation,
    validation,
    bloggersValidationSchema,
    oneOfIdValidation,
    authMiddleware,
    paginationValidation,
    postsValidationSchema,
    postsValidationSchemaWithoutBloggerId
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

bloggersRouter.get('/:id',
    async (req: Request, res: Response) => {
        const bloggerId = Number(req.params.id)
        const blogger = await bloggersService.getBloggerById(bloggerId)
        if(blogger){
            res.json(blogger)
        } else {
            res.sendStatus(404)
        }
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

bloggersRouter.post('/:id/posts',
    authMiddleware,
    bloggersIdValidation,
    checkSchema(postsValidationSchemaWithoutBloggerId),
    validation,
    async (req: Request, res: Response) => {
        const bloggerId = Number(req.params.id)
        const {title, shortDescription, content} = req.body
        const newPost = await postsService.createPost(title, shortDescription, content, bloggerId)
        console.log(newPost)
        if (newPost) {
            res.status(201).json(newPost)
        } else {
            res.sendStatus(404)
        }
    })

bloggersRouter.put('/:id',
    authMiddleware,
    bloggersIdValidation,
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


bloggersRouter.delete('/:id',
    authMiddleware,
    bloggersIdValidation, // check blogger here or send 404 in controller?
    idValidation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        await bloggersService.deleteBloggerById(id)
        res.sendStatus(204)
    })

