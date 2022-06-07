import {IBlogger} from "../interfaces";
import {bloggers} from "../db/mock_data";

export const findBloggerById = (bloggers: IBlogger[], id: number) =>{
    return bloggers.find(b => b.id === id)
}