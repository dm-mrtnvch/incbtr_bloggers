import {IPost} from "../interfaces/global_interfaces";
import {postsRepository} from "../repositories/db-posts-repository";
import {bloggersCollection, postsCollection} from "../db/db";
import {bloggersService} from "./bloggers-service";
import {v4 as uuidv4} from 'uuid';


export const postsService = {
    async getAllPosts(page: number, pageSize: number, searchNameTerm: string, bloggerId?: string | null): Promise<IPost[]> {
        return postsRepository.getAllPosts(page, pageSize, searchNameTerm, bloggerId)
    },
    async getPostById(id: string): Promise<IPost | null> {
        return postsRepository.getPostById(id)
    },
    async createPost(title: string, shortDescription: string, content: string, bloggerId: string): Promise<IPost | null> {
        const blogger = await bloggersService.getBloggerById(bloggerId)
        // double check of blogger. first - middleware. second - in repository
        if (blogger) {
            const newPost: IPost = {
                // id: Number(new Date()),
                id: uuidv4(),
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: blogger.name
            }
            return postsRepository.createPost(newPost)
        } else {
            return null
        }
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string): Promise<boolean> {
        return await postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    },
    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    }
}
