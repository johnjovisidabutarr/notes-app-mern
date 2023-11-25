import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js'
import archiveController from '../controller/archiveController.js'

export const archiveRouter = express.Router()

archiveRouter.use(verifyToken)

archiveRouter.patch('/api/archive/add/:id', archiveController.addToArchive)
archiveRouter.patch(
  '/api/archive/remove/:id',
  archiveController.removeFromArchive
)
archiveRouter.get('/api/archive/get', archiveController.getArchive)
