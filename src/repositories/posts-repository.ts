import {bloggers, posts} from "../db/mock_data";
import {IPost} from "../interfaces";
import {findBloggerById, findObjectById, findPostById} from "../helpers/utils";


export const postsRepository = {
    getAllPosts() {
        return posts

    },
    getPostById(id: number): IPost | boolean {
        const post = findObjectById(posts, id)
        if (post) {
            return post
        } else {
            return false
        }

    },
    createPost(id: number) {
        const blogger = findObjectById(bloggers, id)
        if (blogger) {

        }
    },
    updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        const post = findPostById(posts, id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.bloggerId = bloggerId
            return post
        } else {
            return false
        }
    },
    deletePostById(id: number): boolean{
        const post = findObjectById(posts, id)
        if(post) {
            const postIndex = posts.findIndex(b => b.id === id)
            const filteredPosts = posts.splice(postIndex, 1)
            return filteredPosts.length < posts.length
        }
        return false
    }
}