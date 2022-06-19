import {bloggers} from "../db/mock_data";
import {IBlogger} from "../interfaces/global_interfaces";
import {findObjectById} from "../helpers/utils";


export const bloggersRepository = {
    async getAllBloggers(): Promise<IBlogger[]> {
        return bloggers
    },
    async getBloggerById(id: number): Promise<IBlogger | null> {
        const blogger = findObjectById(bloggers, id)
        return blogger
    },
    async createBlogger(name: string, youtubeUrl: string): Promise<IBlogger> {
        const newBlogger: IBlogger = {
            id: Number(new Date()),
            name,
            youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<IBlogger | undefined> {
        const blogger = findObjectById(bloggers, id)
        if (blogger) {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return blogger
        }
    },
   async deleteBloggerById(id: number): Promise<boolean | undefined> {
        const blogger = findObjectById(bloggers, id)
        if (blogger) {
            const bloggerIndex = bloggers.findIndex(b => b.id === id)
            const filteredBloggers = bloggers.splice(bloggerIndex, 1)
            return !!filteredBloggers.length
        }
    }
}
