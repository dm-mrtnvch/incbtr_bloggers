import {bloggers} from "../db/mock_data";
import {IBlogger} from "../interfaces";
import {findBloggerById} from "../helpers/utils";

export const bloggersRepository = {
    getAllBloggers(): IBlogger[] {
        return bloggers
    },
    getBloggerById(id: number)/*: IBlogger | boolean*/ {
        const blogger = findBloggerById(bloggers, id)
        if (blogger) {
            return blogger
        }
        return false
    },
    createBlogger(name: string, youtubeUrl: string){
        const newBlogger: IBlogger = {
            id: Number(new Date()),
            name,
            youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger

    },
    updateBlogger(id: number, name: string, youtubeUrl: string){
        const blogger = findBloggerById(bloggers, id)
        if(blogger){
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return blogger
        } else {
            return false
        }

    },
    deleteBloggerById(id: number): boolean{
        const blogger = findBloggerById(bloggers, id)
        if(blogger) {
            const bloggerIndex = bloggers.findIndex(b => b.id === id)
            const filteredBloggers = bloggers.splice(bloggerIndex, 1)
            return filteredBloggers.length < bloggers.length
        }
        return false
    }
}