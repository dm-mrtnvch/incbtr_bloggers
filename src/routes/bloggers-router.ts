import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {checkSchema} from "express-validator";
import {
    idValidation,
    bloggersIdValidation,
    validation,
    bloggersValidationMiddleware, oneOfIdValidation
} from "../middlewares/middlewares";


export const bloggersRouter = Router()

bloggersRouter.get('',
    (req, res) => {
        const bloggers = bloggersRepository.getAllBloggers()
        res.json(bloggers)
    })

bloggersRouter.get('/:id',
    oneOfIdValidation,
    idValidation,
    (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const blogger = bloggersRepository.getBloggerById(id)
        res.json(blogger)
    })

bloggersRouter.post('',
    checkSchema(bloggersValidationMiddleware),
    validation,
    (req: Request, res: Response) => {
        const {name, youtubeUrl} = req.body
        const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl)
        res.status(201).json(newBlogger)
    })

bloggersRouter.put('/:id',
    bloggersIdValidation,
    idValidation,
    checkSchema(bloggersValidationMiddleware),
    validation,
    (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const {name, youtubeUrl} = req.body
        bloggersRepository.updateBlogger(id, name, youtubeUrl)
        res.sendStatus(204)
    })


bloggersRouter.delete('/:id',
    bloggersIdValidation,
    idValidation,
    (req: Request, res: Response) => {
        const id = Number(req.params.id)
        bloggersRepository.deleteBloggerById(id)
        res.sendStatus(204)
    })

