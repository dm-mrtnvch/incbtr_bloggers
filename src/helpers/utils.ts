export const urlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

export function findObjectById<T extends {id: number}>(array:T[], id: number): T | null {
    return array.find(el => el.id === id) || null
}

export const getPaginationData = (query: any) => {
    const page = typeof query.PageNumber === 'string' ? +query.PageNumber : 1
    const pageSize = typeof query.PageSize === 'string' ? +query.PageSize : 10
    const searchNameTerm = typeof query.SearchNameTerm === 'string' ? query.SearchNameTerm : ""
    return {page, pageSize, searchNameTerm}
}
