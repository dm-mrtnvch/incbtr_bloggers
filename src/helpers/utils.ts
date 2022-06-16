export const urlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

export function findObjectById<T extends {id: number}>(array:T[], id: number): T | null {
    return array.find(el => el.id === id) || null
}

