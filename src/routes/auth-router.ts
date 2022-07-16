import {Router} from "express";
import {usersService} from "../domain/users-service";

export const authRouter = Router({})

authRouter.post('/login',
    async (req, res) => {
    const {loginOrEmail, password} = req.body
    const checkCredentials = await usersService._checkCredentials(loginOrEmail, password)
})
