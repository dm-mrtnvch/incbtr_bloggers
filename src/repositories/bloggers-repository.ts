import {bloggers} from "../db/mock_data";
import {IBlogger} from "../interfaces";
import {findObjectById, paramsValidation} from "../helpers/utils";


export const bloggersRepository = {
    getAllBloggers(): IBlogger[] {
        return bloggers
    },
    getBloggerById(id: number): any /*IBlogger | boolean*/ {
        const blogger = findObjectById(bloggers, id)
        if (blogger) {
            return blogger
        }
        return false
    },
    createBlogger(name: string, youtubeUrl: string): IBlogger | any {
        const errors = paramsValidation([
            {name, field: 'name'},
            {youtubeUrl, field: 'youtubeUrl'}
        ])

        if (errors.errorsMessages.length > 0) {
            return errors
        }

        const newBlogger: IBlogger = {
            id: Number(new Date()),
            name,
            youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger

    },
    updateBlogger(id: number, name: string, youtubeUrl: string): any {
        // validate id?
        if (!id) { return false }
        // validate params firstly or find blogger -> validate ?
        const blogger = findObjectById(bloggers, id)

        const errors = paramsValidation([
            {name, field: 'name'},
            {youtubeUrl, field: 'youtubeUrl'}
        ])
        if (errors.errorsMessages.length > 0) {
            return errors
        }

        if (blogger) {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return blogger
        } else {
            return false
        }

    },
    deleteBloggerById(id: number): boolean {
        const blogger = findObjectById(bloggers, id)
        if (blogger) {
            const bloggerIndex = bloggers.findIndex(b => b.id === id)
            const filteredBloggers = bloggers.splice(bloggerIndex, 1)
            if (filteredBloggers.length > 0) {
                return !!filteredBloggers.length
            }
        }
        return false
    }
}
