import {IEntityWithPagination, IUser} from "../interfaces/global_interfaces";
import {postsCollection, usersCollection} from "../db/db";

export const usersRepository = {
    async getUsers(page: number, pageSize: number): Promise<IEntityWithPagination<IUser[]>>{
        const totalCount = await usersCollection.countDocuments()
        const pagesCount = Math.ceil(totalCount / pageSize)
        const users = await usersCollection
            .find({}, {projection: {_id: 0}})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        return {
            page,
            pageSize,
            pagesCount,
            totalCount,
            items: users
        }
    },
    async createUser(user: IUser): Promise<IUser>{
        await usersCollection.insertOne(user)

        return {
            id: user.id,
            login: user.login,
            passwordHash: user.passwordHash,
            createdAt: user.createdAt
        }
    },
   async deleteUser(id: string){
        const result = await usersCollection.deleteOne({id})
        return result.deletedCount === 1
    },
    async findByLogin(login: string){
        const user = await usersCollection.findOne({login})
        return user
    }
}
