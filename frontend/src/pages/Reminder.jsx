import { useEffect } from 'react'
import useAxiosJWT from '../hooks/useAxiosJWT'
import NotesCard from '../component/NotesCard'
import { useNotesContext } from '../hooks/useNotesContext'

const Reminder = () => {
  const axiosJWT = useAxiosJWT()
  const { reminder, dispatch } = useNotesContext()

  useEffect(() => {
    const getReminder = async () => {
      try {
        const response = await axiosJWT.get('/api/reminder/get')
        dispatch({ type: 'SET_REMINDER', payload: response.data })
      } catch (error) {
        console.log(error)
      }
    }

    getReminder()
  }, [])

  return (
    <div>
      <NotesCard
        notes={reminder}
        message={'Notes with upcoming reminders appear here'}
      />
    </div>
  )
}

export default Reminder
