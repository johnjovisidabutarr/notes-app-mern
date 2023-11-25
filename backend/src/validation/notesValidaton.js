import Joi from 'joi'

const addNoteSchema = Joi.object({
  title: Joi.string().max(255).required(),
  content: Joi.string().required(),
})

const updateNoteSchema = Joi.object({
  title: Joi.string().max(255),
  content: Joi.string(),
  reminder: Joi.boolean(),
  dueTime: Joi.date(),
})

export { addNoteSchema, updateNoteSchema }
