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

export function validURL(str: string) {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}
export function validName(name: string){
    let regName = /^[\w'\-,.][^0-9_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    return regName.test(name)

}

function foo<T>(x: T): T {
    return x;
}
