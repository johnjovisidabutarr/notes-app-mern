import {
  BiTrash,
  BiArchiveIn,
  BiArchiveOut,
  BiBulb,
  BiBell,
} from 'react-icons/bi'
import { LuClock4 } from 'react-icons/lu'
import NotesModal from './NotesModal'
import { useEffect, useState } from 'react'
import useAxiosJWT from '../hooks/useAxiosJWT'
import { useNotesContext } from '../hooks/useNotesContext'
import moment from 'moment/moment'

const NotesCard = ({ notes, message }) => {
  const axiosJWT = useAxiosJWT()
  const { dispatch } = useNotesContext()

  const [showModal, setShowModal] = useState(false)
  const [isArchive, setIsArchive] = useState(false)
  const [index, setIndex] = useState(0)

  const deleteNote = async (id) => {
    try {
      const response = await axiosJWT.delete(`/api/notes/delete/${id}`)
      const deletedNote = response.data.result
      if (location.pathname == '/') {
        dispatch({ type: 'DELETE_NOTE', payload: deletedNote })
      } else if (location.pathname == '/reminder') {
        dispatch({ type: 'DELETE_REMINDER', payload: deletedNote })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addArchive = async (id) => {
    try {
      const response = await axiosJWT.patch(`api/archive/add/${id}`)
      if (location.pathname == '/') {
        dispatch({ type: 'DELETE_NOTE', payload: response.data })
      } else if (location.pathname == '/reminder') {
        dispatch({ type: 'UPDATE_REMINDER', payload: response.data })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const removeArchive = async (id) => {
    try {
      const response = await axiosJWT.patch(`api/archive/remove/${id}`)
      if (location.pathname == '/archive') {
        dispatch({ type: 'REMOVE_ARCHIVE', payload: response.data })
      } else if (location.pathname == '/reminder') {
        dispatch({ type: 'UPDATE_REMINDER', payload: response.data })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 animate-[load_300ms_ease-in-out]'>
      {notes && notes.length > 0 ? (
        notes.map((note, i) => (
          <div
            key={note.id}
            className='border relative p-4 rounded-lg hover:shadow-md hover:ring-1 hover:ring-gray-50'>
            <div
              className='cursor-pointer px-5 py-2'
              onClick={() => {
                setShowModal(true)
                setIndex(i)
              }}>
              <div className='font-semibold'>
                {note.title.length > 30 ? (
                  <p>{note.title.slice(0, 25)}...</p>
                ) : (
                  <p>{note.title}</p>
                )}
              </div>

              <div className='text-gray-700 my-4'>
                {note.content.length > 30 ? (
                  <p>{note.content.slice(0, 25)}...</p>
                ) : (
                  <p>{note.content}</p>
                )}
              </div>

              <div className='text-xs font-semibold'>
                {note.reminder && (
                  <button className='flex items-center py-1 pe-2 bg-gray-100 rounded-full'>
                    <LuClock4 className='mx-1' />
                    {moment(note.dueTime).calendar()}
                  </button>
                )}
              </div>
            </div>

            <div className='absolute inset-x-0 bottom-0 flex justify-end'>
              {note.archive ? (
                <button
                  className='p-2 rounded-full hover:bg-gray-200'
                  onClick={() => removeArchive(note.id)}>
                  <BiArchiveOut />
                </button>
              ) : (
                <button
                  className='p-2 rounded-full hover:bg-gray-200'
                  onClick={() => addArchive(note.id)}>
                  <BiArchiveIn />
                </button>
              )}

              <button
                className='p-2 rounded-full hover:bg-gray-200'
                onClick={() => deleteNote(note.id)}>
                <BiTrash />
              </button>
            </div>
            <br />
          </div>
        ))
      ) : (
        <div className='flex flex-col col-span-4 justify-center items-center space-y-2 relative top-full'>
          {location.pathname == '/' && <BiBulb size={100} color='gray' />}
          {location.pathname == '/reminder' && (
            <BiBell size={100} color='gray' />
          )}
          {location.pathname == '/archive' && (
            <BiArchiveIn size={100} color='gray' />
          )}
          {location.pathname == '/bin' && <BiTrash size={100} color='gray' />}
          <p className='text-lg text-gray-500'>{message}</p>
        </div>
      )}

      <NotesModal
        showModal={showModal}
        setShowModal={setShowModal}
        notes={notes}
        index={index}
      />
    </div>
  )
}

export default NotesCard
