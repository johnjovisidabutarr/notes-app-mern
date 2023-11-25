import Joi from 'joi'

const userRegisterSchema = Joi.object({
  email: Joi.string().max(100).email().required(),
  username: Joi.string().required(),
  password: Joi.string().max(255).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': '{{#label}} does not match' }),
})

const userLoginSchema = Joi.object({
  email: Joi.string().max(100).email().required(),
  password: Joi.string().max(255).required(),
})

export { userRegisterSchema, userLoginSchema }
