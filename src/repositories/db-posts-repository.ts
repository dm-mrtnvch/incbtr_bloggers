import {IPost} from "../interfaces/global_interfaces";
import {postsCollection} from "../db/db";


export const postsRepository = {
    async getAllPosts(page: number, pageSize: number, searchNameTerm: string, bloggerId?: string | null): Promise<any> {
        let filter = bloggerId
            ? {title: {$regex: searchNameTerm ? searchNameTerm : ""}, bloggerId}
            : {title: {$regex: searchNameTerm ? searchNameTerm : ""}}
        const totalCount = await postsCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pageSize)
        const posts = await postsCollection
            .find(filter, {projection: {_id: 0}})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: posts
        }
    },
    async getPostById(id: string): Promise<IPost | null> {
        return postsCollection.findOne({id}, {projection: {_id: 0}})
    },
    async createPost(newPost: IPost): Promise<IPost> {
        await postsCollection.insertOne(newPost)
        return {
            id: newPost.id,
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            bloggerId: newPost.bloggerId,
            bloggerName: newPost.bloggerName
        }

    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string): Promise<boolean> {
        // const blogger: IBlogger | null = await bloggersCollection.findOne({bloggerId})
        // if (blogger) {
        const result = await postsCollection.findOneAndUpdate({id}, {$set: {title, shortDescription, content}})
        console.log(result)
        return !!result.ok
        // }
        // return false
    },
    async deletePostById(id: string): Promise<boolean> {
        const post = await postsCollection.findOne({id})
        if (post) {
            const result = await postsCollection.deleteOne({id})
            return result.deletedCount === 1
        }
        return false
    }
}
