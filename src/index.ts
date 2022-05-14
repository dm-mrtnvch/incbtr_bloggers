import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {bloggers, Iblogger} from "./mocks/db";

const app = express()
app.use(bodyParser())
const PORT = process.env.PORT || 4000
const error = {"errorsMessages": [{"message": "string", "field": "string"}], "resultCode": 0}


app.get('/', (req, res) => {
    res.send('simple get request')
})
app.get('/bloggers', (req: Request, res: Response) => {
    res.status(200).send(bloggers)
})
app.get('/bloggers/:id', (req: Request, res: Response) => {
    const bloggerId = +req.params.id
    const blogger = bloggers.find(b => b.id === bloggerId)
    if (blogger) {
        res.status(200).send(blogger)
    } else {
        res.send(404)
    }
})
app.post('/bloggers', (req: Request, res: Response) => {
    if (!req.body?.name?.trim() ||  !req.body?.youtubeUrl?.trim()) {
        res.status(400).send(error)
        return
    }
    const newBlogger: Iblogger = {
        id: bloggers.length + 1,
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    bloggers.push(newBlogger)
    res.status(201).send(newBlogger)
})
app.put('/bloggers/:id', (req: Request, res: Response) => {
     if (!req.body.name || !req.body.youtubeUrl) {
        res.send(400)
    }
    const bloggerId = +req.params.id
    const blogger = bloggers.find(b => b.id === bloggerId)
    if (blogger) {
        blogger.name = req.body.name
        blogger.youtubeUrl = req.body.youtubeUrl
        res.status(204).send(blogger)
    } else {
        res.status(404).send(error)
    }
})
app.delete('/bloggers/:id', (req, res) => {
    const bloggerId = +req.params.id
    const filteredBloggers = bloggers.filter(b => b.id !== bloggerId)
    bloggers = filteredBloggers
    if(filteredBloggers){
        res.status(204).send(filteredBloggers)
    } else {
        res.send(404)
    }
})

app.listen(PORT, () => {
    console.log(`listening ${PORT} port`)
})