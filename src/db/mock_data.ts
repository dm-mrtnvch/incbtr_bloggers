import {IBlogger, IPost} from "../interfaces";

export const bloggers: IBlogger[] = [
    {id: 1, name: 'raz', youtubeUrl: 'https://www.youtube.com/raz'},
    {id: 2, name: 'dva', youtubeUrl: 'https://www.youtube.com/dva'},
    {id: 3, name: 'tri', youtubeUrl: 'https://www.youtube.com/tri'},
    {id: 4, name: 'che', youtubeUrl: 'https://www.youtube.com/che'},
    {id: 5, name: 'piat', youtubeUrl: 'https://www.youtube.com/piat'}
]

export const posts: IPost[] = [
    {
        id: 6,
        title: 'title raz',
        bloggerId: 11,
        bloggerName: 'bloggerNameRaz',
        content: 'bla bla bla raz',
        shortDescription: 'short raz'
    },
    {
        id: 7,
        title: 'title dva',
        bloggerId: 12,
        bloggerName: 'bloggerNameDva',
        content: 'bla bla bla dva',
        shortDescription: 'short dva'
    },
    {
        id: 8,
        title: 'title tri',
        bloggerId: 13,
        bloggerName: 'bloggerNameTri',
        content: 'bla bla bla tri',
        shortDescription: 'short tri'
    },
    {
        id: 9,
        title: 'title che',
        bloggerId: 14,
        bloggerName: 'bloggerNameChe',
        content: 'bla bla bla che',
        shortDescription: 'short che'
    },
    {
        id: 10,
        title: 'title piat',
        bloggerId: 15,
        bloggerName: 'bloggerNamePiat',
        content: 'bla bla bla piat',
        shortDescription: 'short piat'
    },
]