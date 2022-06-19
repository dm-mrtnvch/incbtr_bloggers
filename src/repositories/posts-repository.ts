import {posts} from "../db/mock_data";
import {IPost} from "../interfaces/global_interfaces";
import {findObjectById} from "../helpers/utils";
import {bloggersRepository} from "./bloggers-repository";


export const postsRepository = {
   async getAllPosts(): Promise<IPost[]> {
        return posts

    },
   async getPostById(id: number): Promise<IPost | null> {
        return findObjectById(posts, id)
    },
   async createPost(title: string, shortDescription: string, content: string, bloggerId: number): Promise<IPost | undefined> {
        const blogger = await bloggersRepository.getBloggerById(bloggerId)
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
            posts.push(newPost)
            return newPost
        }
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        const post = await postsRepository.getPostById(id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.bloggerId = bloggerId
            return true
        }
        return false
    },
    async deletePostById(id: number): Promise<boolean> {
        const post = await postsRepository.getPostById(id)
        if (post) {
            const postIndex = posts.findIndex(b => b.id === id)
            const filteredPosts = posts.splice(postIndex, 1)
            return !!filteredPosts.length
        }
        return false
    }
}
