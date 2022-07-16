import {Request, Response, Router} from "express";
import {IPost} from "../interfaces/global_interfaces";
import {authMiddleware, postsIdValidationAsync, postsValidationSchema, validation} from "../middlewares/middlewares";
import {body, checkSchema} from "express-validator";
import {postsService} from "../domain/posts-service";
import {getPaginationData, getSearchNameTerm} from "../helpers/utils";
import {commentsService} from "../domain/comments-service";


export const postsRouter = Router()

postsRouter.get('',
    async (req, res) => {
        const {page, pageSize} = getPaginationData(req.query)
        const searchNameTerm = getSearchNameTerm(req.query)
        const posts: IPost[] = await postsService.getAllPosts(page, pageSize, searchNameTerm)
        res.json(posts)
    })

postsRouter.get('/:id',
    postsIdValidationAsync,
    async (req, res) => {
        const {id} = req.params
        const post = await postsService.getPostById(id)
        res.json(post)
    })

postsRouter.post('',
    authMiddleware,
    checkSchema(postsValidationSchema),
    validation,
    async (req: Request, res: Response) => {
        const {title, shortDescription, content, bloggerId} = req.body
        const newPost = await postsService.createPost(title, shortDescription, content, bloggerId)
        if (newPost) {
            res.status(201).json(newPost)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.put('/:id',
    authMiddleware,
    postsIdValidationAsync,
    checkSchema(postsValidationSchema),
    validation,
    async (req: Request, res: Response) => {
        const {id} = req.params
        const {title, shortDescription, content, bloggerId} = req.body
        const isUpdated = await postsService.updatePost(id, title, shortDescription, content, bloggerId)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.delete('/:id',
    authMiddleware,
    postsIdValidationAsync,
    async (req: Request, res: Response) => {
        const {id} = req.params
        await postsService.deletePostById(id)
        res.sendStatus(204)
        // const isDeleted = await postsService.deletePostById(id)
        // if(isDeleted){
        //     res.sendStatus(204)
        // } else {
        //     res.status(404).json({error: 'error from posts controller'})
        // }
    })

const contentValidationComments = body("content")
    .exists()
    .trim()
    .notEmpty()
    .isLength({ min: 20, max: 300 });

postsRouter.post(
    "/:postId/comments",
    authMiddleware,
    contentValidationComments,
    validation,
    async (req: Request, res: Response) => {
        // const content = req.body.content;
        // const userId = req.user?.id;
        // const userLogin = req.user?.accountData.login;
        // const postId = req.params.postId;
        //
        // if (!userId || !userLogin) {
        //     return res.sendStatus(401);
        // }
        //
        // const findPost = await postsService.getPostById(postId);
        // if (!findPost) {
        //     res.sendStatus(404);
        // } else {
        //     const newComment = await commentsService.createComments(
        //         userId,
        //         userLogin,
        //         postId,
        //         content
        //     );
        //     res.status(201).send(newComment);
        // }
    }
);
postsRouter.get("/:postId/comments", async (req: Request, res: Response) => {
    const pageSize = req.query.PageSize ? Number(req.query.PageSize) : 10;
    const pageNumber = req.query.PageNumber ? Number(req.query.PageNumber) : 1;
    const postId = req.params.postId;
    const post = await postsService.getPostById(postId);
    if (!post) {
        return res.sendStatus(404);
    }
    const getComment = await commentsService.getCommentsPost(
        pageSize,
        pageNumber,
        postId
    );

    res.status(200).send(getComment);
});
