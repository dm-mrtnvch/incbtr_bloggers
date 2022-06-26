import {IPost} from "../interfaces/global_interfaces";
import {postsRepository} from "../repositories/db-posts-repository";
import {bloggersCollection, postsCollection} from "../db/db";
import {bloggersService} from "./bloggers-service";


export const postsService = {
    async getAllPosts(page: number, pageSize: number, searchNameTerm: string, bloggerId?: number | null): Promise<IPost[]> {
        return postsRepository.getAllPosts(page, pageSize, searchNameTerm, bloggerId)
    },
    async getPostById(id: number): Promise<IPost | null> {
        return postsRepository.getPostById(id)
    },
    async createPost(title: string, shortDescription: string, content: string, bloggerId: number): Promise<IPost | null> {
        const blogger = await bloggersService.getBloggerById(bloggerId)
        // double check of blogger. first - middleware. second - in repository
        if (blogger) {
            const newPost: IPost = {
                id: Number(new Date()),
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
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        return await postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    },
    async deletePostById(id: number): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    }
}
