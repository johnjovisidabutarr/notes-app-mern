import asyncHandler from 'express-async-handler'
import archiveService from '../service/archiveService.js'

const addToArchive = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await archiveService.add(id)
  return res.json(result)
})

const removeFromArchive = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await archiveService.remove(id)
  return res.json(result)
})

const getArchive = asyncHandler(async (req, res) => {
  const { id: ownerId } = req.user
  const result = await archiveService.get(ownerId)
  return res.json(result)
})

export default { addToArchive, removeFromArchive, getArchive }
