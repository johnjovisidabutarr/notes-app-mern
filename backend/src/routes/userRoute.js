import express from 'express'
import userController from '../controller/userController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

export const userRouter = express.Router()

userRouter.post('/api/users/register', userController.register)
userRouter.post('/api/users/login', userController.login)
userRouter.delete('/api/users/logout', verifyToken, userController.logout)
userRouter.get('/api/users/get', verifyToken, userController.getUser)
userRouter.get('/api/users/token', userController.refreshToken)
