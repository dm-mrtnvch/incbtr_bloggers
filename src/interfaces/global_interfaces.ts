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
