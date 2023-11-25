import asyncHandler from 'express-async-handler'
import notesService from '../service/notesService.js'

const postNote = asyncHandler(async (req, res) => {
  const result = await notesService.addNotes(req.user, req.body)
  return res.status(200).json({ result })
})

const getNotes = asyncHandler(async (req, res) => {
  const { id: ownerId } = req.user
  const result = await notesService.getNotes(ownerId)
  return res.json({ result })
})

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await notesService.deleteNoteById(id)
  return res.json({ result, message: 'Deleted successfully' })
})

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await notesService.updateNote(id, req.body)
  return res.json({ result })
})

export default {
  postNote,
  getNotes,
  deleteNote,
  updateNote,
}
