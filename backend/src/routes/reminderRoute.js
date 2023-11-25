import express from 'express'
import { getReminder } from '../controller/reminderController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

export const reminderRouter = express.Router()

reminderRouter.use(verifyToken)

reminderRouter.get('/api/reminder/get', getReminder)
