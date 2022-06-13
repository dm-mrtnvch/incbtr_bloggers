import {Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const bloggersRouter = Router()

bloggersRouter.get('', (req, res) => {
    const bloggers = bloggersRepository.getAllBloggers()
    res.json(bloggers)
})

bloggersRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const blogger = bloggersRepository.getBloggerById(id)
    if (blogger) {
        res.json(blogger)
        return
    } else {
        res.sendStatus(404)
    }
})

bloggersRouter.post('', (req, res) => {
    const {name, youtubeUrl} = req.body
    const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl)

    if ('id' in newBlogger) { // newBlogger.id?
        res.status(201).json(newBlogger)
        return /*return ??? works fine without return*/
    } else {
        res.status(400).send(newBlogger)
    }
})

bloggersRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const {name, youtubeUrl} = req.body

    const isUpdated = bloggersRepository.updateBlogger(id, name, youtubeUrl)
    if (isUpdated) {
        if(isUpdated.id){
            res.sendStatus(204)
            // return ???
        }
        if (isUpdated.errorsMessages) {
            res.status(400).send(isUpdated)
            return
        }
    }
    res.sendStatus(404)
})

bloggersRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const isDeleted = bloggersRepository.deleteBloggerById(id)
    if (isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

