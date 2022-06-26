import {v4 as uuidv4} from 'uuid';
import {postsRepository} from "../repositories/db-posts-repository";
import {usersRepository} from "../repositories/users-repository";
import {IEntityWithPagination, IUser} from "../interfaces/global_interfaces";


export const usersService = {
  async  getUsers(page: number, pageSize: number): Promise<IEntityWithPagination<IUser[]>>{
        return usersRepository.getUsers(page, pageSize)
    },
   async createUser(login: string, password: string){
        const user = {
            id: uuidv4(),
            login,
            password
        }
        return usersRepository.createUser(user)
    },
    async deleteUser(id: string){
        return usersRepository.deleteUser(id)
    }
}
