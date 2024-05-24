import Joi from 'joi'
import { generalFields } from '../../middleware/Validation.js'

export const profile ={
    file:generalFields.file.required(),
}
export const updatPassword ={
    body:Joi.object({
        oldPassword:generalFields.password,
        newPassword :generalFields.password.invalid(Joi.ref('oldPassword')),
        Cpassword:Joi.string().valid(Joi.ref('newPassword')).required(),
    }),
}
export const shareProfile ={
    params:Joi.object({
        id:generalFields.id,
    }),
}