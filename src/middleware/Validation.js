import joi from "joi";
import { Types } from "mongoose";
const dateMethods = ['body', 'query', 'params', 'headers','file']
const validationObjectId=(value,helper)=>{
    if(Types.ObjectId.isValid(value)){
        return true;
    }
    return helper.message();
}



export const generalFields={
    id:joi.string().custom(validationObjectId).required(),
    email:joi.string().email().required().messages({
        'string.empty':"email is required",
        'string.empty':"plz enter a valid email ",
            }),
    password:joi.string().required().min(3).messages({
'string.empty':"password is required",
    }),
    file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
      //  dest:joi.string(),
    })
}

const validation = (Schema) => {
    return (req, res, next) => {
        const validationArray = [];
        dateMethods.forEach((key) => {
            if (Schema[key]) {
                const VAlidationResult = Schema[key].validate(req[key], { abortEarly: false });
                if (VAlidationResult.error) {
                    validationArray.push(VAlidationResult.error.details);
                }
            }
        })

        if (validationArray.length > 0) {
            return res.status(400).json({ message: "validation error", validationArray });
        }
        else {
            return next();
        }
    }
}
export default validation;