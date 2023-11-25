import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js'
import notesController from '../controller/notesController.js'

export const notesRouter = express.Router()

notesRouter.use(verifyToken)

notesRouter.post('/api/notes/add', notesController.postNote)
notesRouter.get('/api/notes/get', notesController.getNotes)
notesRouter.delete('/api/notes/delete/:id', notesController.deleteNote)
notesRouter.patch('/api/notes/update/:id', notesController.updateNote)
