import { useEffect, useState } from 'react'
import useAxiosJWT from '../hooks/useAxiosJWT'
import { useLocation, useNavigate } from 'react-router-dom'
import AddNote from '../component/AddNote'
import { useNotesContext } from '../hooks/useNotesContext'
import NotesCard from '../component/NotesCard'

const Home = () => {
  const { notes, dispatch } = useNotesContext()
  const [username, setUsername] = useState('')

  const axiosJWT = useAxiosJWT()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosJWT.get('/api/users/get')
        setUsername(response.data.result.username)
      } catch (error) {
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUsers()
  }, [])

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axiosJWT.get('/api/notes/get')
        const notes = response.data.result
        dispatch({ type: 'SET_NOTES', payload: notes })
      } catch (error) {
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getNotes()
  }, [])

  return (
    <div>
      <AddNote />
      <NotesCard notes={notes} message={'Notes you add appear here'} />
    </div>
  )
}

export default Home
