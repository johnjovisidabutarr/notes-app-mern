import jwt from 'jsonwebtoken'
import { ResponseError } from '../error/ResponseError.js'
import asyncHandler from 'express-async-handler'

const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) throw new ResponseError(401, 'UNAUTHORIZED')
  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err) throw new ResponseError(403, 'FORBIDDEN')
    req.user = decoded
    next()
  })
})

export { verifyToken }
