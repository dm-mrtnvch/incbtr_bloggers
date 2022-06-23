import {posts} from "../db/mock_data";
import {IBlogger, IPost} from "../interfaces/global_interfaces";
import {findObjectById} from "../helpers/utils";
import {bloggersRepository} from "./bloggers-repository";
import {bloggersCollection, postsCollection} from "../db/db";


export const postsRepository = {
    async getAllPosts(): Promise<IPost[]> {
        return await postsCollection.find({}, {projection: {_id: 0}}).toArray()
    },
    async getPostById(id: number): Promise<IPost | null> {
        return await postsCollection.findOne({id}, {projection: {_id: 0}})
    },
    async createPost(newPost: IPost, bloggerId: number): Promise<IPost> {
        await postsCollection.insertOne(newPost)
        return newPost

    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        // const blogger: IBlogger | null = await bloggersCollection.findOne({bloggerId})
        // if (blogger) {
        const result = await postsCollection.findOneAndUpdate({id}, {$set: {title, shortDescription, content}})
        console.log(result)
        return !!result.ok
        // }
        // return false
    },
    async deletePostById(id: number): Promise<boolean> {
        const post = await postsCollection.findOne({id})
        if (post) {
            const result = await postsCollection.deleteOne({id})
            return result.deletedCount === 1
        }
        return false
    }
}
