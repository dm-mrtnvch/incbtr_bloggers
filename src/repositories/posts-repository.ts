import {posts} from "../db/mock_data";
import {IPost} from "../interfaces/global_interfaces";
import {findObjectById} from "../helpers/utils";
import {bloggersRepository} from "./bloggers-repository";


export const postsRepository = {
    getAllPosts() {
        return posts

    },
    getPostById(id: number): IPost | null {
        return findObjectById(posts, id)
    },
    createPost(title: string, shortDescription: string, content: string, bloggerId: number) {
        const blogger = bloggersRepository.getBloggerById(bloggerId)
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
    updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        const post = findObjectById(posts, id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.bloggerId = bloggerId
        }
        // return ???
    },
    deletePostById(id: number) {
        const post = findObjectById(posts, id)
        if (post) {
            const postIndex = posts.findIndex(b => b.id === id)
            const filteredPosts = posts.splice(postIndex, 1)
            return !!filteredPosts.length
        }
    }
}
