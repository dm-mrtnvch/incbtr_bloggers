import {IBlogger, IPost, Test} from "../interfaces";

export const findBloggerById = (bloggers: IBlogger[], id: number) => {
    return bloggers.find(b => b.id === id)
}

export const findPostById = (posts: IPost[], id: number) => {
    return posts.find(p => p.id === id)
}


export function findObjectById<T extends {id: number}>(array:T[], id: number): T | null{
    return array.find(el => el.id === id) || null
}

function foo<T>(x: T): T {
    return x;
}
