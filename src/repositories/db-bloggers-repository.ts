import {bloggers} from "../db/mock_data";
import {IBlogger} from "../interfaces/global_interfaces";
import {findObjectById} from "../helpers/utils";
import {bloggersCollection} from "../db/db";
import e from "express";



export const bloggersRepository = {
    async getAllBloggers(page: number, pageSize: number, searchNameTerm: string): Promise<any> {
        const filter = searchNameTerm ? {name: {$regex: searchNameTerm}} : {}
        console.log(filter)
        const bloggers = await bloggersCollection
            .find(filter, {projection: {_id: 0}})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const totalCount = await bloggersCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pageSize)
        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: bloggers
        }
    },
    async getBloggerById(id: number): Promise<IBlogger | null> {
        return  bloggersCollection.findOne({id}, {projection: {_id: 0}})
    },
    async createBlogger(newBlogger: IBlogger): Promise<IBlogger> {
        await bloggersCollection.insertOne(newBlogger)
        return {
            name: newBlogger.name,
            youtubeUrl: newBlogger.youtubeUrl,
            id: newBlogger.id
        }
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
