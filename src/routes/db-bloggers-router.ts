import {Request, Response, Router} from "express";
import {checkSchema} from "express-validator";
import {
    authMiddleware,
    bloggersIdValidation,
    bloggersValidationSchema,
    idValidation,
    postsValidationSchemaWithoutBloggerId,
    validation
} from "../middlewares/middlewares";
import {bloggersService} from "../domain/bloggers-service";
import {getPaginationData, getSearchNameTerm} from "../helpers/utils";
import {postsService} from "../domain/posts-service";


export const bloggersRouter = Router()

bloggersRouter.get('',
    // paginationValidation, // is it necessary to validate pagination data and throw error...
    // validation, // or it's enough to make condition expression in getPaginationData function?
    async (req: Request, res: Response) => {
        const {page, pageSize} = getPaginationData(req.query)
        const searchNameTerm = getSearchNameTerm(req.query)
        const bloggers = await bloggersService.getAllBloggers(page, pageSize, searchNameTerm)
        res.json(bloggers) // what happens if we don't get bloggers?
    })

bloggersRouter.get('/:id',
    // bloggersIdValidation, // is it necessary to validate id in middleware...
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const blogger = await bloggersService.getBloggerById(id)
        if (blogger) { // as we can validate validate blogger by id here?
            res.json(blogger)
        } else {
            res.sendStatus(404)
        }
    })

bloggersRouter.get('/:id/posts',
    bloggersIdValidation,
    async (req, res) => {
        const {page, pageSize} = getPaginationData(req.query)
        const searchNameTerm = getSearchNameTerm(req.query)
        const id = Number(req.params.id)
        const posts = await postsService.getAllPosts(page, pageSize, searchNameTerm, id)
        res.json(posts)
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
    checkSchema(postsValidationSchemaWithoutBloggerId), // now we have two schemas:
    // one with bloggerId (to create post in posts controller), another with bloggerId in params with id name (not bloggerId)
    // solutions: check each req.body step by step || have two schemas || pass exception in schema (is it possible?) || path: '/:bloggerId/posts'
    validation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const {title, shortDescription, content} = req.body
        const newPost = await postsService.createPost(title, shortDescription, content, id)
        if (newPost) {
            res.status(201).json(newPost)
        } else {
            res.sendStatus(404)
        }
    })

bloggersRouter.put('/:id',
    authMiddleware,
    bloggersIdValidation,
    // idValidation,
    checkSchema(bloggersValidationSchema),
    validation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
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

