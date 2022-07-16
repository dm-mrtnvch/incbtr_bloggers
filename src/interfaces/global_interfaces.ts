export interface IUnique {
    id: string
}

export interface IBlogger extends IUnique {
    name: string
    youtubeUrl: string
}

export interface IPost extends IUnique {
    title: string
    shortDescription: string
    content: string
    bloggerId: string
    bloggerName: string
}

export interface IUser extends IUnique{
    login: string
    passwordHash: string
    createdAt: Date
}

export interface IError {
    message: string
    field: string
}

export interface IEntityWithPagination<T> {
    page: number
    pageSize: number
    pagesCount: number
    totalCount: number
    items: T
}
