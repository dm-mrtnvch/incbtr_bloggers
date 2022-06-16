import {bloggers} from "../db/mock_data";
import {IBlogger} from "../interfaces/global_interfaces";
import {findObjectById} from "../helpers/utils";


export const bloggersRepository = {
    getAllBloggers(): IBlogger[] {
        return bloggers
    },
    getBloggerById(id: number): IBlogger | null {
        const blogger = findObjectById(bloggers, id)
        return blogger
    },
    createBlogger(name: string, youtubeUrl: string) {
        const newBlogger: IBlogger = {
            id: Number(new Date()),
            name,
            youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger

    },
    updateBlogger(id: number, name: string, youtubeUrl: string) {
        const blogger = findObjectById(bloggers, id)
        if (blogger) {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return blogger
        }
    },
    deleteBloggerById(id: number) {
        const blogger = findObjectById(bloggers, id)
        if (blogger) {
            const bloggerIndex = bloggers.findIndex(b => b.id === id)
            const filteredBloggers = bloggers.splice(bloggerIndex, 1)
            return !!filteredBloggers.length
        }
    }
}
