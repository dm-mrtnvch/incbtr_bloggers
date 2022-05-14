export interface IBlogger {
    id:         number
    name:       string
    youtubeUrl: string
}

export interface  IPost {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}