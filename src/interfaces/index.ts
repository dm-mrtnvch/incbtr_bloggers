export interface IUnique {
    id: number
}
export type Test = IBlogger | IPost

export interface IBlogger extends IUnique {
    name: string
    youtubeUrl: string
}

export interface IPost extends IUnique {
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}

export interface IPostViewModel extends IPost, IUnique {
    bloggerName: string
}

