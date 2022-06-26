import {IEntityWithPagination, IUser} from "../interfaces/global_interfaces";
import {postsCollection, usersCollection} from "../db/db";

export const usersRepository = {
    async getUsers(page: number, pageSize: number): Promise<IEntityWithPagination<IUser[]>>{
        const totalCount = await usersCollection.countDocuments()
        const pagesCount = Math.ceil(totalCount / pageSize)
        const users = await usersCollection
            .find({}, {projection: {_id: 0, password: 0}})
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
    async createUser(user: IUser): Promise<IUser | null>{
        await usersCollection.insertOne(user)
        return user
    },
   async deleteUser(id: string){
        const result = await usersCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}
// {
//     let filter = bloggerId
//         ? {title: {$regex: searchNameTerm ? searchNameTerm : ""}, bloggerId}
//         : {title: {$regex: searchNameTerm ? searchNameTerm : ""}}
//     const totalCount = await postsCollection.countDocuments(filter)
//     const pagesCount = Math.ceil(totalCount / pageSize)
//     const posts = await postsCollection
//         .find(filter, {projection: {_id: 0}})
//         .skip((page - 1) * pageSize)
//         .limit(pageSize)
//         .toArray()
//
//     return {
//         pagesCount,
//         page,
//         pageSize,
//         totalCount,
//         items: posts
//     }
// }
