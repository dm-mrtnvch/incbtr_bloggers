export const urlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

export function findObjectById<T extends { id: number }>(array: T[], id: number): T | null {
    return array.find(el => el.id === id) || null
}

export const getPaginationData = (query: any) => { // typization???
    const page = typeof query.PageNumber === "number" ? Number(query.PageNumber) : 1
    const pageSize = typeof query.PageSize === "number" ? Number(query.PageSize) : 10
    return {page, pageSize}
}

export const getSearchNameTerm = (query: any) => { // typization???
    return typeof query.SearchNameTerm === "string" ? query.SearchNameTerm : ""
}
