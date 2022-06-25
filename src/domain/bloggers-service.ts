import {bloggers} from "../db/mock_data";
import {IBlogger} from "../interfaces/global_interfaces";
import {findObjectById} from "../helpers/utils";
import {bloggersCollection} from "../db/db";
import e from "express";
import {bloggersRepository} from "../repositories/db-bloggers-repository";


export const bloggersService = {
    async getAllBloggers(page: number, pageSize: number, searchNameTerm: string): Promise<IBlogger[]> {
        return bloggersRepository.getAllBloggers(page, pageSize, searchNameTerm) // works without await. why?
        // return bloggers
    },
    async getBloggerById(id: number): Promise<IBlogger | null> {
        return   bloggersRepository.getBloggerById(id)
    },
    async createBlogger(name: string, youtubeUrl: string): Promise<IBlogger> {
        const newBlogger: IBlogger = {
            id: Number(new Date()),
            name,
            youtubeUrl
        }
        return bloggersRepository.createBlogger(newBlogger)
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return bloggersRepository.updateBlogger(id, name, youtubeUrl)
    },
    async deleteBloggerById(id: number): Promise<boolean> {
        return bloggersRepository.deleteBloggerById(id)
    },
    async checkIfBloggerExist (id: number) {
        return !!await bloggersRepository.getBloggerById(id)
    }
}

