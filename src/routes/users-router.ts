import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/middlewares";
import {usersService} from "../domain/users-service";
import {getPaginationData} from "../helpers/utils";

export const usersRouter = Router({})

usersRouter.get('',
    async (req, res) => {
        const {page, pageSize} = getPaginationData(req.query)
        const users = await usersService.getUsers(page, pageSize)
        res.json(users)
    })

usersRouter.post('',
    // authMiddleware,
    async (req: Request, res: Response) => {
        const {login, password} = req.body
        const user = await usersService.createUser(login, password)
        res.send(201).json(user)


    })

usersRouter.delete('/:id',
    async (req, res) => {
        const {id} = req.params
        const isDeleted = await usersService.deleteUser(id)
        if(isDeleted){
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })
