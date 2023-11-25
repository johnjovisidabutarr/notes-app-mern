import { nanoid } from 'nanoid'
import { prismaClient } from '../application/database.js'
import {
  addNoteSchema,
  updateNoteSchema,
} from '../validation/notesValidaton.js'
import { validate } from '../validation/validation.js'
import { sliceString } from '../config/sliceString.js'

const addNotes = async (auth, payload) => {
  const notes = validate(addNoteSchema, payload)
  const noteId = 'note-' + nanoid(16)

  const newContent = sliceString(notes.content)

  const data = {
    id: noteId,
    title: notes.title,
    content: newContent,
    ownerId: auth.id,
  }

  const newNote = await prismaClient.note.create({
    data,
  })

  return newNote
}

const getNotes = async (ownerId) => {
  const notes = await prismaClient.note.findMany({
    where: {
      ownerId,
      archive: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return notes
}

const deleteNoteById = async (id) => {
  const note = await prismaClient.note.delete({
    where: {
      id,
    },
  })

  return note
}

const updateNote = async (id, payload) => {
  const notes = validate(updateNoteSchema, payload)

  const updatedNote = await prismaClient.note.update({
    data: notes,
    where: {
      id,
    },
  })

  return updatedNote
}

export default {
  addNotes,
  getNotes,
  deleteNoteById,
  updateNote,
}
