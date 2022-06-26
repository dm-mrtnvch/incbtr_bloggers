import {IBlogger, IEntityWithPagination} from "../interfaces/global_interfaces";
import {bloggersRepository} from "../repositories/db-bloggers-repository";
import {v4 as uuidv4} from 'uuid';

export const bloggersService = {
    async getAllBloggers(page: number, pageSize: number, searchNameTerm: string): Promise<IEntityWithPagination<IBlogger[]>> {
        return bloggersRepository.getAllBloggers(page, pageSize, searchNameTerm)
    },
    async getBloggerById(id: string): Promise<IBlogger | null> {
        return bloggersRepository.getBloggerById(id)
    },
    async createBlogger(name: string, youtubeUrl: string): Promise<IBlogger> {
        const newBlogger: IBlogger = {
            // id: Number(new Date()),
            id: uuidv4(),
            name,
            youtubeUrl
        }
        return bloggersRepository.createBlogger(newBlogger)
    },
    async updateBlogger(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return bloggersRepository.updateBlogger(id, name, youtubeUrl)
    },
    async deleteBloggerById(id: string): Promise<boolean> {
        return bloggersRepository.deleteBloggerById(id)
    },
    async checkIfBloggerExist(id: string) {
        return !!await bloggersRepository.getBloggerById(id)
    }
}

