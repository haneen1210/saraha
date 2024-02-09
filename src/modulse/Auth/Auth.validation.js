import joi from "joi";

export const signupSchema= {
body : joi.object({
userName:joi.string().alphanum().required(),
email:joi.string().email().required(),
password:joi.string().required(),
Cpassword:joi.string().valid(joi.ref('password')).required(),
gender:joi.string().valid('Male','Female'),
}),

}
export const signinSchema=joi.object({
    email:joi.string().email().required().messages({
        'string.empty':"email is required",
        'string.empty':"plz enter a valid email ",
            }),
    password:joi.string().required().min(3).messages({
'string.empty':"password is required",
    }),
    });