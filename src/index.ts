import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {bloggers, Iblogger} from "./mocks/db";
const app = express()
app.use(bodyParser())

const PORT = process.env.port || 4000

app.get('/', (req, res) => {
    res.send('simple get request')
})

app.get('/bloggers', (req: Request, res: Response) => {
    res.status(200).send(bloggers)
})

app.post('/bloggers', (req: Request, res: Response) => {
    if(!req.body.name || !req.body.youtubeUrl) {
        res.status(400).send({"errorsMessages": [{"message": "string", "field": "string"}], "resultCode": 0})
        return
    }
    const newBlogger: Iblogger = {
        id: ++bloggers.length,
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    res.status(201).send([...bloggers, newBlogger])
})

app.listen(PORT, () => {
    console.log(`listening ${PORT} port`)
})