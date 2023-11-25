import { useContext } from 'react'
import { NotesContext } from '../context/NotesContextProvider'

export const useNotesContext = () => {
  const context = useContext(NotesContext)

  if (!context) {
    throw Error('useNotesContext must be used inside an NotesContextProvider')
  }

  return context
}
