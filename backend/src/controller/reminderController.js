import asyncHandler from 'express-async-handler'
import reminderService from '../service/reminderService.js'

const getReminder = asyncHandler(async (req, res) => {
  const { id: ownerId } = req.user
  const result = await reminderService.getReminder(ownerId)
  return res.json(result)
})

export { getReminder }
