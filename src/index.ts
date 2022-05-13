import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
// import {bloggers, Iblogger} from "./mocks/db";

const app = express()
app.use(bodyParser())
const PORT = process.env.PORT || 4000

export interface Iblogger {
    id:         number;
    name:       string;
    youtubeUrl: string;
}

export let bloggers: Iblogger[] = [
    {id: 1, name: 'raz', youtubeUrl: 'https://www.youtube.com/raz'},
    {id: 2, name: 'dva', youtubeUrl: 'https://www.youtube.com/dva'},
    {id: 3, name: 'tri', youtubeUrl: 'https://www.youtube.com/tri'},
    {id: 4, name: 'che', youtubeUrl: 'https://www.youtube.com/che'},
    {id: 5, name: 'piat', youtubeUrl: 'https://www.youtube.com/piat'}
]



app.get('/', (req, res) => {
    res.send('simple get request')
})
app.get('/bloggers', (req: Request, res: Response) => {
    res.status(200).send(bloggers)
})
app.get('/bloggers/:id', (req: Request, res: Response) => {
    const bloggerId = +req.params.id
    const blogger = bloggers.find(b => b.id === bloggerId)
    console.log(blogger)
    if (blogger) {
        res.status(200).send(blogger)
    } else {
        res.send(404)
    }
})
app.post('/bloggers', (req: Request, res: Response) => {
    if (!req.body?.name?.trim() ||  !req.body?.youtubeUrl?.trim()) {
        res.status(400).send({"errorsMessages": [{"message": "string", "field": "string"}], "resultCode": 0})
        return
    }
    const newBlogger: Iblogger = {
        id: ++bloggers.length,
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    bloggers = [...bloggers, newBlogger]
    res.status(201).send(bloggers)
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
        res.status(404).send({errorsMessages: [{message: "string", field: "title"}], resultCode: 1})
    }
})
app.delete('/bloggers/:id', (req, res) => {
    const bloggerId = +req.params.id
    const filteredBloggers = bloggers.filter(b => b.id !== bloggerId)
    if(filteredBloggers){
        res.status(204).send(filteredBloggers)
    } else {
        res.send(404)
    }
})

app.listen(PORT, () => {
    console.log(`listening ${PORT} port`)
})