import {check, param, Schema, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {urlPattern} from "../helpers/utils";
import {IError} from "../interfaces/global_interfaces";
import {AUTHORISATION, CREDENTIALS} from "../config/constants";
import {bloggersService} from "../domain/bloggers-service";
import {postsService} from "../domain/posts-service";


// ----- validation schemas -----
export const bloggersValidationSchema: Schema = {
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
            options: {max: 15},
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

export const postsValidationSchema: Schema = {
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
            options: {max: 30},
            errorMessage: "max length is 30 symbols"
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
            options: {max: 100},
            errorMessage: 'max length is 100 symbols'
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
        in: ['body', 'params'],
        exists: {
            errorMessage: 'bloggerId is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'bloggerId field can\'t be empty'
        },
        // toInt: true,
        custom: {
            options: async (id) => {
                const blogger = await bloggersService.getBloggerById(id)
                return !!blogger ? Promise.resolve() : Promise.reject()
            },
            errorMessage: 'blogger doesn\'t exit'
        }
    }
}

export const postsValidationSchemaWithoutBloggerId: Schema = {
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
            options: {max: 30},
            errorMessage: "max length is 30 symbols"
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
            options: {max: 100},
            errorMessage: 'max length is 100 symbols'
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
    }
}

export const paginationValidation = [
    check('page')
        .optional({checkFalsy: true})
        .isInt({min: 1})
        .withMessage('page error'),
    check('pageSize')
        .optional({checkFalsy: true})
        .isInt({min: 1})
        .withMessage('pageSize error'),
    check('searchNameTerm')
        .optional({checkFalsy: true})
        .isString()
        .withMessage('searchNameTerm error'),
]

// ----- validations -----
export const bloggersIdValidationAsync = async (req: Request, res: Response, next: NextFunction) => {
    await param('id', 'blogger doesn\'t exist')
        // .toInt()
        .custom(async id => {
            const blogger = await bloggersService.getBloggerById(id) // what solution is correct
            // const blogger = await  bloggersService.checkIfBloggerExist(bloggerId) // this one or previous?
            return (!!blogger) ? Promise.resolve() : Promise.reject()
        }).run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.sendStatus(404)
    } else {
        next()
    }
}

export const postsIdValidationAsync = async (req: Request, res: Response, next: NextFunction) => {
    await param('id', 'post doesn\'t exist')
        // .toInt()
        .custom(async id => {
            const post = await postsService.getPostById(id)
            return (!!post) ? Promise.resolve() : Promise.reject()
        }).run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.sendStatus(404)
    } else {
        next()
    }
}

export const idValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.sendStatus(404)
    } else {
        next()
    }
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
    } else {
        res.status(400).json({errorsMessages: errorMessages})
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers

    if (!authorization) {
        res.sendStatus(401)
        return;
    }

    const isBasic = authorization?.split(' ')[0] === AUTHORISATION.BASIC
    if (isBasic) {
        const encoded = authorization?.split(' ')[1]
        const decoded = Buffer.from(encoded, 'base64').toString();
        const loginAndPassword = decoded.split(':')
        const login = loginAndPassword[0]
        const password = loginAndPassword[1]

        if (login === CREDENTIALS.ADMIN.LOGIN && password === CREDENTIALS.ADMIN.PASSWORD) {
            next()
            return
        }
    }
    res.sendStatus(401)
}
