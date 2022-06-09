import {bloggers, posts} from "../db/mock_data";
import {IPost, IPostViewModel} from "../interfaces";
import {findBloggerById, findPostById} from "../helpers/utils";

// const postsWithBloggerName = (post: IPost): IPostViewModel => {
//     const {id, title, content, shortDescription, bloggerId} = post
//     const bloggerName: any = findBloggerById(bloggers, id)?.name
//     return {
//         id,
//         title,
//         content,
//         shortDescription,
//         bloggerId,
//         bloggerName
//     }
// }

export const postsRepository = {
    getAllPosts() {
        return posts

    },
    getPostById(id: number): IPost | boolean {
        const post = findPostById(posts, id)
        if (post) {
            return post
        } else {
            return false
        }

    },
    createPost(id: number) {
        const blogger = findBloggerById(bloggers, id)
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
        const post = findPostById(posts, id)
        if(post) {
            const postIndex = posts.findIndex(b => b.id === id)
            const filteredPosts = bloggers.splice(postIndex, 1)
            return filteredPosts.length < bloggers.length
        }
        return false
    }
}