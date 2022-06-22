import {Request, Response, Router} from "express";
import {checkSchema} from "express-validator";
import {
    idValidation,
    bloggersIdValidation,
    validation,
    bloggersValidationMiddleware, oneOfIdValidation, authMiddleware, paginationRules
} from "../middlewares/middlewares";
import {bloggersService} from "../domain/bloggers-service";
import {getPaginationData} from "../helpers/utils";


export const bloggersRouter = Router()

bloggersRouter.get('',
    paginationRules,
    validation,
    async (req: Request, res: Response) => {
        const {page, pageSize, searchNameTerm} = getPaginationData(req.query)
        const bloggers = await bloggersService.getAllBloggers(page, pageSize, searchNameTerm)
        res.json(bloggers)
    })

bloggersRouter.get('/:id',
    oneOfIdValidation,
    idValidation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const blogger = await bloggersService.getBloggerById(id)
        res.json(blogger)
    })

bloggersRouter.post('',
    authMiddleware,
    checkSchema(bloggersValidationMiddleware),
    validation,
    async (req: Request, res: Response) => {
        const {name, youtubeUrl} = req.body
        const newBlogger = await bloggersService.createBlogger(name, youtubeUrl)
        res.status(201).json(newBlogger)
    })

bloggersRouter.put('/:id',
    authMiddleware,
    bloggersIdValidation,
    idValidation,
    checkSchema(bloggersValidationMiddleware),
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
    bloggersIdValidation,
    idValidation,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const isDeleted = await bloggersService.deleteBloggerById(id)
        if (isDeleted) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

