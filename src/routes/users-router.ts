import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/middlewares";
import {usersService} from "../domain/users-service";
import {getPaginationData} from "../helpers/utils";

export const usersRouter = Router({})

usersRouter.get('',
    async (req, res) => {
        const {page, pageSize} = getPaginationData(req.query)
        const users = await usersService.getUsers(page, pageSize)
        res.json({
            page,
            pageSize,
            pagesCount: users.pagesCount,
            totalCount: users.totalCount,
            items: users.items.map(u => ({
                id: u.id,
                login: u.login
            }))
        })
    })

usersRouter.post('',
    // authMiddleware,
    async (req: Request, res: Response) => {
        const {login, password} = req.body
        const newUser = await usersService.createUser(login, password)
        res.status(201).json(newUser)
    })

usersRouter.delete('/:id',
    async (req, res) => {
        const {id} = req.params
        const isDeleted = await usersService.deleteUser(id)
        if (isDeleted) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

