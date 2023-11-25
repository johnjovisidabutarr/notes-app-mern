import { useEffect } from 'react'
import useAxiosJWT from '../hooks/useAxiosJWT'
import NotesCard from '../component/NotesCard'
import { useNotesContext } from '../hooks/useNotesContext'

const Archive = () => {
  const axiosJWT = useAxiosJWT()
  const { archive, dispatch } = useNotesContext()

  useEffect(() => {
    const getArchive = async () => {
      const response = await axiosJWT.get('/api/archive/get')
      dispatch({ type: 'SET_ARCHIVE', payload: response.data })
    }

    getArchive()
  }, [])

  return (
    <div>
      <NotesCard notes={archive} message={'Your archived notes appear here'} />
    </div>
  )
}

export default Archive
