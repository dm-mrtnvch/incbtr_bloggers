import {v4 as uuidv4} from 'uuid';
import {postsRepository} from "../repositories/db-posts-repository";
import {usersRepository} from "../repositories/users-repository";
import {IEntityWithPagination, IUser} from "../interfaces/global_interfaces";
import bcrypt from 'bcrypt'
import {log} from "util";

export const usersService = {
    async getUsers(page: number, pageSize: number): Promise<IEntityWithPagination<IUser[]>> {
        return usersRepository.getUsers(page, pageSize)
    },
    async createUser(login: string, password: string) {
        const passwordHash = await this._generateHash(password)
        const newUser = {
            id: uuidv4(),
            login,
            passwordHash,
            createdAt: new Date()
        }
        const user = await usersRepository.createUser(newUser)
        return {
            id: user.id,
            login: user.login
        }
    },
    async deleteUser(id: string) {
        return usersRepository.deleteUser(id)
    },
    async _checkCredentials(login: string, password: string) {
        const user = await usersRepository.findByLogin(login)
        if (!user) return false

        return bcrypt.compare(password, user.passwordHash)
    },
    async _generateHash(password: string) {
        const hash = await bcrypt.hash(password, 10)
        console.log('hash', hash)
        return hash
    }
}
