import express from 'express'
import { userRouter } from '../routes/userRoute.js'
import { notesRouter } from '../routes/notesRoute.js'
import { reminderRouter } from '../routes/reminderRoute.js'
import { errorMiddleware } from '../middleware/errorMiddleware.js'
import { limiter } from '../middleware/rateLimit.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { archiveRouter } from '../routes/archiveRoute.js'

export const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

// app.use(limiter)

app.use(userRouter)
app.use(notesRouter)
app.use(reminderRouter)
app.use(archiveRouter)

app.use(errorMiddleware)
