import {Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {error} from "../config";
import {validName, validURL} from "../helpers/utils";

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
    const errors: any = {errorsMessages: []}

    const isValidName = validName(name)
    if (!isValidName || !name?.trim()) {
        errors.errorsMessages.push({message: 'incorrect field', field: "name"});
    }

    const isValidUrl = validURL(youtubeUrl)
    if (!isValidUrl) {
        console.log(isValidUrl)
        errors.errorsMessages.push({message: 'incorrect field', field: "youtubeUrl"});
    }

    if (errors.errorsMessages.length > 0) {
        res.status(400).send(errors)
        return
    }

    if (name.trim().length > 0 && youtubeUrl.trim().length > 0) {
        const newBlogger = bloggersRepository.createBlogger(name, youtubeUrl)
        res.status(201).json(newBlogger)
        return
    }
    res.status(400).send(errors)
})

bloggersRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const {name, youtubeUrl} = req.body
    const isUpdated = bloggersRepository.updateBlogger(id, name, youtubeUrl)
    if (isUpdated) {
        res.sendStatus(204)
        return
    } else {
        res.sendStatus(404)
    }
})

bloggersRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const isDeleted = bloggersRepository.deleteBloggerById(id)
    if (isDeleted) {
        res.sendStatus(204)
        return
    } else {
        res.sendStatus(404)
    }
})

