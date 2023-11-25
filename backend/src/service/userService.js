import { prismaClient } from '../application/database.js'
import { ResponseError } from '../error/ResponseError.js'
import {
  userLoginSchema,
  userRegisterSchema,
} from '../validation/userValidation.js'
import { validate } from '../validation/validation.js'
import { nanoid } from 'nanoid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (payload) => {
  const validatedPayload = validate(userRegisterSchema, payload)

  const countUser = await prismaClient.user.count({
    where: {
      OR: [
        { email: validatedPayload.email },
        { username: validatedPayload.username },
      ],
    },
  })

  if (countUser == 1) {
    throw new ResponseError(400, 'Email or username already exist')
  }

  const userId = `user-${nanoid()}`
  const hashedPassword = await bcrypt.hash(validatedPayload.password, 10)

  const data = {
    id: userId,
    email: validatedPayload.email,
    username: validatedPayload.username,
    password: hashedPassword,
  }

  const newUser = await prismaClient.user.create({
    data,
    select: {
      id: true,
      email: true,
      username: true,
    },
  })

  return newUser
}

const login = async (payload) => {
  const validatedPayload = validate(userLoginSchema, payload)

  const foundUser = await prismaClient.user.findUnique({
    where: {
      email: validatedPayload.email,
    },
  })

  if (!foundUser) {
    throw new ResponseError(404, 'User not found')
  }

  const isMatched = await bcrypt.compare(
    validatedPayload.password,
    foundUser.password
  )

  if (!isMatched) {
    throw new ResponseError(400, 'Incorrect email or password')
  }

  const { id, email, username } = foundUser

  const accessToken = jwt.sign(
    { id, email, username },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { id, email, username },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: '1d' }
  )

  await prismaClient.user.update({
    data: {
      refreshToken,
    },
    where: {
      email: foundUser.email,
    },
    select: {
      refreshToken: true,
    },
  })

  return {
    accessToken,
    refreshToken,
  }
}

const logout = async (request) => {
  const { id } = request
  const result = await prismaClient.user.update({
    data: {
      refreshToken: null,
    },
    where: {
      id,
    },
    select: {
      email: true,
      username: true,
    },
  })
  return result
}

const getUser = async (request) => {
  const id = request.id
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    select: {
      email: true,
      username: true,
    },
  })

  return user
}

const refreshToken = async (request) => {
  const { refreshToken } = request
  if (!refreshToken) {
    throw new ResponseError(401, 'UNAUTHORIZED')
  }

  const user = await prismaClient.user.findFirst({
    where: {
      refreshToken,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  })

  if (!user) throw new ResponseError(401, 'UNAUTHORIZED')

  let accessToken
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, decoded) => {
    if (err) throw new ResponseError(401, 'UNAUTHORIZED')
    const { id, email, username } = decoded
    if (id !== user.id) throw new ResponseError(403, 'FORBIDDEN')
    accessToken = jwt.sign(
      { id, email, username },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '15s' }
    )
  })
  return accessToken
}

export default {
  register,
  login,
  logout,
  getUser,
  refreshToken,
}
