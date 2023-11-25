import { logger } from '../application/logging.js'
import userService from '../service/userService.js'
import asyncHandler from 'express-async-handler'

const register = asyncHandler(async (req, res) => {
  const result = await userService.register(req.body)
  return res.json({
    result,
  })
})

const login = asyncHandler(async (req, res) => {
  const result = await userService.login(req.body)
  const { accessToken, refreshToken } = result

  const option = {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, option)

  return res.json({ accessToken })
})

const logout = asyncHandler(async (req, res) => {
  await userService.logout(req.user)
  res.clearCookie('refreshToken')
  return res.sendStatus(200)
})

const getUser = asyncHandler(async (req, res) => {
  const result = await userService.getUser(req.user)
  return res.json({ result })
})

const refreshToken = asyncHandler(async (req, res) => {
  const result = await userService.refreshToken(req.cookies)
  return res.json({ accessToken: result })
})

export default {
  register,
  login,
  logout,
  getUser,
  refreshToken,
}
