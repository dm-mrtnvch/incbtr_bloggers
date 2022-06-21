import express from 'express'
import bodyParser from "body-parser";
import {runDb} from "./db/db";
import {bloggersRouter} from "./routes/db-bloggers-router";
import {postsRouter} from "./routes/db-posts-router";
// import {config} from "dotenv";
// config()

const app = express()
app.use(bodyParser())
const PORT = process.env.PORT || 5000

app.get('', (req, res) => {
    res.send('simple get request completed')
})
app.use('/posts', postsRouter)
app.use('/bloggers', bloggersRouter)



const startApp = async () => {
    await runDb()
    app.listen(PORT, () => {
        console.log(`Example app listening on port: ${PORT}`)
    })
}

startApp()
