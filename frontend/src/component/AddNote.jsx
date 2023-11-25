import { useState } from 'react'
import { useNotesContext } from '../hooks/useNotesContext'
import useAxiosJWT from '../hooks/useAxiosJWT'
import { IoMdAdd } from 'react-icons/io'

const AddNote = () => {
  const { dispatch } = useNotesContext()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const axiosJWT = useAxiosJWT()

  const addNote = async (e) => {
    e.preventDefault()
    try {
      const data = { title, content }
      const response = await axiosJWT.post('/api/notes/add', data)
      const note = response.data.result
      dispatch({ type: 'CREATE_NOTES', payload: note })
      setTitle('')
      setContent('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-9/12 md:w-11/2 lg:w-1/2 mx-auto mb-5'>
      <div className='animate-[load_300ms_ease-in-out]'>
        <form className='border border-white rounded-xl ring-1 ring-gray-200 shadow-md shadow-gray-300 p-3'>
          <div className='flex flex-col p-2 overflow-auto'>
            <input
              required
              type='text'
              placeholder='Title'
              className='p-2 rounded-md focus:outline-none bg-inherit'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              required
              type='text'
              placeholder='Take a note...'
              className='p-2 rounded-md focus:outline-none bg-inherit'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='flex justify-end p-2 space-x-2'>
            <button
              className='rounded-full py-1 px-2 me-2 cursor-pointer hover:bg-gray-100'
              onClick={addNote}>
              <p>Create</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNote
