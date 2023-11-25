import { createContext, useReducer } from 'react'

export const NotesContext = createContext({})

export const notesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return {
        notes: action.payload,
      }
    case 'CREATE_NOTES':
      return {
        notes: [action.payload, ...state.notes],
      }
    case 'UPDATE_NOTE':
      return {
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      }
    case 'DELETE_NOTE':
      return {
        notes: state.notes.filter((note) => note.id != action.payload.id),
      }
    case 'SET_REMINDER':
      return {
        reminder: action.payload,
      }
    case 'UPDATE_REMINDER':
      return {
        reminder: state.reminder.map((reminder) =>
          reminder.id === action.payload.id ? action.payload : reminder
        ),
      }
    case 'DELETE_REMINDER':
      return {
        reminder: state.reminder.filter((rm) => rm.id != action.payload.id),
      }
    case 'SET_ARCHIVE':
      return {
        archive: action.payload,
      }
    case 'REMOVE_ARCHIVE':
      return {
        archive: state.archive.filter((ar) => ar.id != action.payload.id),
      }
    default:
      return state
  }
}

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: null,
  })

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  )
}
