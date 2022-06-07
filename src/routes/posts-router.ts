import {Request, Response, Router} from "express";
import {IBlogger, IPost} from "../interfaces";
import {posts} from "../db/mock_data";
import {postsRepository} from "../repositories/posts-repository";

export const postsRouter = Router()

postsRouter.get('', (req, res) => {
    const posts = postsRepository.getAllPosts()
    res.json(posts)
})

postsRouter.get('/:id', (req, res) => {
    const postId = Number(req.params.id)
    const post = postsRepository.getPostById(postId)
    if(post){
        res.json(post)
    } else {
        res.status(404)
    }
})
// postsRouter.get('/posts/:id', (req: Request, res: Response) => {
//     const postId = +req.params.id
//     const post = posts.find(p => p.id === postId)
//
//     if (post) {
//         res.send(post)
//     } else {
//         res.send(404)
//     }
// })

postsRouter.post('/posts', (req: Request, res: Response) => {
    const {title = 'post title', shortDescription = 'short description', content = 'post content', bloggerId} = req.body

    const newPost: IPost = {
        id: Number(new Date()),
        title,
        shortDescription,
        content,
        bloggerId,
        bloggerName: 'sdfsd'
    }
    posts.push(newPost)

})