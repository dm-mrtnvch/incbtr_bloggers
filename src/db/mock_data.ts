import {IBlogger, IPost} from "../interfaces";

export const bloggers: IBlogger[] = [
    {id: 1, name: 'razBlogger', youtubeUrl: 'https://www.youtube.com/raz'},
    {id: 2, name: 'dvaBlogger', youtubeUrl: 'https://www.youtube.com/dva'},
    {id: 3, name: 'triBlogger', youtubeUrl: 'https://www.youtube.com/tri'},
    {id: 4, name: 'cheBlogger', youtubeUrl: 'https://www.youtube.com/che'},
    {id: 5, name: 'piatBlogger', youtubeUrl: 'https://www.youtube.com/piat'}
]

export const posts: IPost[] = [
    {
        id: 6,
        title: 'title raz',
        content: 'bla bla bla raz',
        shortDescription: 'short raz',
        bloggerId: 1,
        bloggerName: 'raz name'
    },
    {
        id: 7,
        title: 'title dva',
        content: 'bla bla bla dva',
        shortDescription: 'short dva',
        bloggerId: 2,
        bloggerName: 'dva name'
    },
    {
        id: 8,
        title: 'title tri',
        content: 'bla bla bla tri',
        shortDescription: 'short tri',
        bloggerId: 3,
        bloggerName: 'tri name'
    },
    {
        id: 9,
        title: 'title che',
        content: 'bla bla bla che',
        shortDescription: 'short che',
        bloggerId: 4,
        bloggerName: 'che name'
    },
    {
        id: 10,
        title: 'title piat',
        content: 'bla bla bla piat',
        shortDescription: 'short piat',
        bloggerId: 5,
        bloggerName: 'piat name'
    },
]