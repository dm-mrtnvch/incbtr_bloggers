export interface Iblogger {
    id:         number;
    name:       string;
    youtubeUrl: string;
}

export const bloggers: Iblogger[] = [
    {id: 1, name: 'raz', youtubeUrl: 'https://www.youtube.com/raz'},
    {id: 2, name: 'dva', youtubeUrl: 'https://www.youtube.com/dva'},
    {id: 3, name: 'tri', youtubeUrl: 'https://www.youtube.com/tri'},
    {id: 4, name: 'che', youtubeUrl: 'https://www.youtube.com/che'},
    {id: 5, name: 'piat', youtubeUrl: 'https://www.youtube.com/piat'}
]
