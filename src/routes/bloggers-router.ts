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
        res.status(404)
    }
})

bloggersRouter.post('', (req, res) => {
    const {name, youtubeUrl} = req.body
    const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl)
     res.status(201).json(newBlogger)
})

bloggersRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const {name, youtubeUrl} = req.body
    const isUpdated = bloggersRepository.updateBlogger(id,name, youtubeUrl)
    if(isUpdated){
        res.send(204)
    } else {
        res.send(404)
    }
})

bloggersRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const isDeleted = bloggersRepository.deleteBloggerById(id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

