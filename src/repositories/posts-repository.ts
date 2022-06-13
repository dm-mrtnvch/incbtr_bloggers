import {bloggers, posts} from "../db/mock_data";
import {IPost} from "../interfaces";
import {findObjectById, paramsValidation} from "../helpers/utils";


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
    updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): any {
        if (!id) { return false }

        const post = findObjectById(posts, id)
        if (post) {
            const errors = paramsValidation([
                {title, field: 'title'},
                {shortDescription, field: 'shortDescription'},
                {content, field: 'content'},
                {bloggerId, field: 'bloggerId'}
            ])
            if (errors.errorsMessages.length > 0) {
                return errors
            }

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
            if(posts.length > 1){
                return filteredPosts.length < posts.length
            } else {
                return true
            }
        }
        return false
    }
}
