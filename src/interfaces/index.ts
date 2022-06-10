export interface IUnique {
    id: number
}

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

export interface IError {
    errorsMessages: [
        message: string,
        field: string
    ]
}

/////////////////////////////////////
export type Test = IBlogger | IPost
