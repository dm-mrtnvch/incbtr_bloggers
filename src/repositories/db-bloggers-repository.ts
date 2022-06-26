import {IBlogger, IEntityWithPagination} from "../interfaces/global_interfaces";
import {bloggersCollection} from "../db/db";




export const bloggersRepository = {
    async getAllBloggers(page: number, pageSize: number, searchNameTerm: string): Promise<IEntityWithPagination<IBlogger[]>> {
        const filter = searchNameTerm ? {name: {$regex: searchNameTerm}} : {}
        const bloggers = await bloggersCollection
            .find(filter, {projection: {_id: 0}})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const totalCount = await bloggersCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pageSize)

        return {
            page,
            pageSize,
            pagesCount,
            totalCount,
            items: bloggers
        }
    },
    async getBloggerById(id: string): Promise<IBlogger | null> {
        return bloggersCollection.findOne({id}, {projection: {_id: 0}})
    },
    async createBlogger(newBlogger: IBlogger): Promise<IBlogger> {
        await bloggersCollection.insertOne(newBlogger)
        // is it necessary to check was blogger added?
        // await bloggersCollection.insertOne(newBlogger) returns
        // {acknowledged: true, insertedId: new ObjectId("62b865c7267996818d953009")}
        return {
            name: newBlogger.name,
            youtubeUrl: newBlogger.youtubeUrl,
            id: newBlogger.id
        }
    },
    async updateBlogger(id: string, name: string, youtubeUrl: string): Promise<boolean> {
            const result = await bloggersCollection.findOneAndUpdate({id}, {$set: {name, youtubeUrl}})
            // check questions' file in src
            return !!result.ok
    },
    async deleteBloggerById(id: string): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}
