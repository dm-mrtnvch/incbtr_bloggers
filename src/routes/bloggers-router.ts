// import {Request, Response, Router} from "express";
// import {checkSchema} from "express-validator";
// import {
//     idValidation,
//     bloggersIdValidation,
//     validation,
//     bloggersValidationMiddleware, oneOfIdValidation, authMiddleware
// } from "../middlewares/middlewares";
// import {bloggersRepository} from "../repositories/db-bloggers-repository";
//
//
// export const bloggersRouter = Router()
//
// bloggersRouter.get('',
//     async (req, res) => {
//         const bloggers = await bloggersRepository.getAllBloggers()
//         res.json(bloggers)
//     })
//
// bloggersRouter.get('/:id',
//     oneOfIdValidation,
//     idValidation,
//     async (req: Request, res: Response) => {
//         const id = Number(req.params.id)
//         const blogger = await bloggersRepository.getBloggerById(id)
//         res.json(blogger)
//     })
//
// bloggersRouter.post('',
//     authMiddleware,
//     checkSchema(bloggersValidationMiddleware),
//     validation,
//     async (req: Request, res: Response) => {
//         const {name, youtubeUrl} = req.body
//         const newBlogger = await bloggersRepository.createBlogger(name, youtubeUrl)
//         res.status(201).json(newBlogger)
//     })
//
// bloggersRouter.put('/:id',
//     authMiddleware,
//     bloggersIdValidation,
//     idValidation,
//     checkSchema(bloggersValidationMiddleware),
//     validation,
//     async (req: Request, res: Response) => {
//         const id = Number(req.params.id)
//         const {name, youtubeUrl} = req.body
//         const isUpdated = await bloggersRepository.updateBlogger(id, name, youtubeUrl)
//         if(isUpdated){
//             res.sendStatus(204)
//         } else {
//             res.sendStatus(404)  // ?
//         }
//     })
//
//
// bloggersRouter.delete('/:id',
//     authMiddleware,
//     bloggersIdValidation,
//     idValidation,
//     async (req: Request, res: Response) => {
//         const id = Number(req.params.id)
//         const isDeleted = await bloggersRepository.deleteBloggerById(id)
//         if(isDeleted){
//             res.sendStatus(204)
//         } else {
//             res.sendStatus(404)
//         }
//     })
//
