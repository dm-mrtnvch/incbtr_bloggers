import {bloggers} from "../db/mock_data";
import {IBlogger} from "../interfaces/global_interfaces";
import {findObjectById} from "../helpers/utils";
import {bloggersCollection} from "../db/db";
import e from "express";


export const bloggersRepository = {
    async getAllBloggers(): Promise<IBlogger[]> {
        return await bloggersCollection.find({}).toArray()
    },
    async getBloggerById(id: number): Promise<IBlogger | null> {
        const blogger: IBlogger | null = await bloggersCollection.findOne({id})
        return blogger
    },
    async createBlogger(newBlogger: IBlogger): Promise<IBlogger> {
        await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id}, {$set: {name, youtubeUrl}})
        return result.matchedCount === 1
    },
    async deleteBloggerById(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}
