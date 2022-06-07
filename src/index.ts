import express from 'express'
import bodyParser from "body-parser";
import {postsRouter} from "./routes/posts-router";
import {bloggersRouter} from "./routes/bloggers-router";

const app = express()
app.use(bodyParser())
const PORT = process.env.PORT || 5000
const error = {"errorsMessages": [{"message": "string", "field": "string"}], "resultCode": 0}

app.get('', (req, res) => {
    res.send('simple get request completed')
})
app.use('/posts', postsRouter)
app.use('/bloggers', bloggersRouter)




app.listen(PORT, () => {
    console.log(`listening ${PORT} port`)
})