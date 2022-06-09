import {IBlogger, IPost, Test} from "../interfaces";

export const findBloggerById = (bloggers: IBlogger[], id: number) => {
    return bloggers.find(b => b.id === id)
}

export const findPostById = (posts: IPost[], id: number) => {
    return posts.find(p => p.id === id)
}


export function findObjectById (blabla: Test[], id: number){
    return blabla.find(el => el.id === id)
}

function foo<T>(x: T): T {
    return x;
}
