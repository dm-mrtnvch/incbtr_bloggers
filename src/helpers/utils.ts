import {IError} from "../interfaces";

export function findObjectById<T extends {id: number}>(array:T[], id: number): T | null{
    return array.find(el => el.id === id) || null
}

export function urlValidation(url: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(url);
}
export function stringValidation(stringParam: string){
    const regName = /^[\w'\-,.][^0-9_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    return regName.test(stringParam)
}

export function idValidation(numberParam: number){
    return !isNaN(numberParam)
}

// type FieldType = 'name' | 'youtubeUrl' | 'title' | 'shortDescription' | 'content'
// type test = {
//     params: any,
//     field: FieldType
// }

export function paramsValidation (params: any){
    const error: IError = {errorsMessages: []}
     params.forEach((param: any) => {
         if(param.field === "youtubeUrl") {
             const isValidUrl = urlValidation(param[param.field])
             if (!isValidUrl || !param[param.field]?.trim()) {
                 error.errorsMessages.push({message: `incorrect ${param.field} field`,
                     field: `${param.field}`});
             }
         }
         if(param.field === "bloggerId"){
             const isValidId = idValidation(param[param.field])
             if (!isValidId || !param[param.field]?.trim()) {
                 error.errorsMessages.push({message: `incorrect ${param.field} field`,
                     field: `${param.field}`});
             }
         }
         else {
             const isValidString = stringValidation(param[0])
             if (!isValidString || !param[param.field]?.trim()) {
                 error.errorsMessages.push({message: `incorrect ${param.field} field`,
                     field: `${param.field}`});
             }
         }
    })

    return error
}
