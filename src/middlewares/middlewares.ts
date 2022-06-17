import {oneOf, param, Schema, validationResult} from "express-validator";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {Request, Response, NextFunction} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {urlPattern} from "../helpers/utils";
import {IError} from "../interfaces/global_interfaces";


// ----- validation schemas -----
export const bloggersValidationMiddleware: Schema = {
    name: {
        in: ['body'],
        exists: {
            errorMessage: "name is required"
        },
        trim: true,
        notEmpty: {
            errorMessage: "name field can\'t be empty"
        },
        isLength: {
            options: {min: 5, max: 15},
            errorMessage: "min length is 5 / max length is 15 symbols"
        }
    },
    youtubeUrl: {
        in: ['body'],
        exists: {
            errorMessage: 'youtubeUrl is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'youtubeUrl field can\'t be empty'
        },
        isLength: {
            options: {max: 100},
            errorMessage: 'max length is 100 symbols'
        },
        matches: {
            options: urlPattern,
            errorMessage: "The field YoutubeUrl must match the regular expression '^https:\\\\/\\\\/([a-zA-Z0-9_-]+\\\\.)+[a-zA-Z0-9_-]+(\\\\/[a-zA-Z0-9_-]+)*\\\\/?$'."
        }
    }
}

export const postsValidationMiddleware: Schema = {
    title: {
        in: ['body'],
        exists: {
            errorMessage: "title field is required"
        },
        trim: true,
        notEmpty: {
            errorMessage: "title field can\'t be empty"
        },
        isLength: {
            options: {max: 100},
            errorMessage: "max length is 100 symbols"
        }
    },
    shortDescription: {
        in: ['body'],
        exists: {
            errorMessage: 'shortDescription is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'shortDescription field can\'t be empty'
        },
        isLength: {
            options: {max: 300},
            errorMessage: 'max length is 300 symbols'
        }

    },
    content: {
        in: ['body'],
        exists: {
            errorMessage: 'content is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'content field can\'t be empty'
        },
        isLength: {
            options: {max: 1000},
            errorMessage: 'max length is 1000 symbols'
        }
    },
    bloggerId: {
        in: ['body'],
        exists: {
            errorMessage: 'bloggerId is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'bloggerId field can\'t be empty'
        },
        toInt: true,
        custom: {
            options: (id) => bloggersRepository.getBloggerById(id),
            errorMessage: 'blogger doesn\'t exit'
        }
    }
}

// ----- validations -----
export const bloggersIdValidation = param('id', 'blogger doesn\'t exist')
    .toInt()
    .custom(id => bloggersRepository.getBloggerById(id))

export const postsIdValidation = param('id', "post doesn't exist")
    .toInt()
    .custom(id => {
        return postsRepository.getPostById(id)
    })

export const oneOfIdValidation = oneOf([bloggersIdValidation, postsIdValidation])

export const idValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.sendStatus(404)
    }
    next()
}

export const validation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    const errorMessages: IError[] = errors.array({onlyFirstError: true})
        .map(err => ({
            field: err.param,
            message: err.msg
        }))

    if (errors.isEmpty()) {
        next()
    }
    res.status(404).json({errorsMessages: errorMessages})
}
