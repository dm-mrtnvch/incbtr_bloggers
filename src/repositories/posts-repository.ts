import {posts} from "../db/mock_data";
import {IPost} from "../interfaces";

export const postsRepository = {
    getAllPosts(): IPost[] {
        return posts
    },
    getPostById(id: number): IPost | undefined {
        return posts.find(p => p.id === id)
    }
}