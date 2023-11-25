import { useEffect, useState } from 'react'
import useAxiosJWT from '../hooks/useAxiosJWT'
import { useNotesContext } from '../hooks/useNotesContext'
import moment from 'moment/moment'
import { ImSpinner2 } from 'react-icons/im'
import { FaCheck } from 'react-icons/fa'

const NotesModal = ({ notes, index, showModal, setShowModal }) => {
  const { dispatch } = useNotesContext()
  const axiosJWT = useAxiosJWT()

  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [noteId, setNoteId] = useState('')
  const [rows, setRows] = useState('')
  const [loading, setLoading] = useState(false)
  const [edited, setEdited] = useState(false)
  const [checked, setChecked] = useState(false)
  const [dueTime, setDueTime] = useState(null)

  const updateNote = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosJWT.patch(`/api/notes/update/${noteId}`, {
        title: noteTitle,
        content: noteContent,
        reminder: checked,
        dueTime,
      })
      const updatedData = response.data.result
      if (location.pathname == '/') {
        dispatch({ type: 'UPDATE_NOTE', payload: updatedData })
      } else if (location.pathname == '/reminder') {
        if (!updatedData.reminder) {
          setTimeout(() => {
            setShowModal(false)
            dispatch({ type: 'DELETE_REMINDER', payload: updatedData })
          }, 500)
        } else {
          dispatch({ type: 'UPDATE_REMINDER', payload: updatedData })
        }
      }
      setLoading(true)
      setEdited(true)
      setTimeout(() => {
        setLoading(false)
        setEdited(false)
      }, 500)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (showModal) {
      setNoteTitle(notes[index].title)
      setNoteContent(notes[index].content)
      setRows(Math.ceil(notes[index].content.length / 100) + 1)
      setNoteId(notes[index].id)
      setChecked(notes[index].reminder)
      setDueTime(notes[index].dueTime)
      setEdited(true)
    }
  }, [showModal, notes, index])

  return (
    <div
      className={`transition-opacity ${
        showModal
          ? 'opacity-100 ease-linear duration-300 delay-50'
          : 'opacity-0'
      }`}>
      {showModal ? (
        <div>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-10/12 md:w-3/5 lg:w-1/3 my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <form onSubmit={updateNote}>
                  <div className='flex items-start justify-between px-5 pt-4'>
                    <input
                      className='w-full bg-inherit text-xl font-semibold focus:outline-none py-2'
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                    />
                  </div>

                  <div className='relative px-5 pt-2 flex-auto'>
                    <textarea
                      rows={rows}
                      cols={100}
                      autoFocus
                      className='w-full bg-inherit focus:outline-none'
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                    />
                  </div>

                  <div className='flex relative mt-2 ps-4 text-xs'>
                    <input
                      onChange={() => setChecked(!checked)}
                      type='checkbox'
                      checked={checked}
                      className='cursor-pointer'
                    />
                    <label
                      className='cursor-pointer'
                      onClick={() => setChecked(!checked)}>
                      Remind me
                    </label>
                  </div>

                  <div
                    className='relative mt-2 pb-2 ps-4 text-xs space-x-4 border-b'
                    hidden={!checked}>
                    <input
                      type='datetime-local'
                      min={moment(new Date().toISOString())
                        .format()
                        .toString()
                        .slice(0, 16)}
                      className='border border-gray-200 rounded px-1'
                      value={
                        dueTime
                          ? moment(dueTime).format().toString().slice(0, 16)
                          : ''
                      }
                      onChange={(e) => setDueTime(e.target.value)}
                    />
                  </div>

                  <div className='grid grid-cols-3 items-center pt-2 pb-3'>
                    <div className='col-span-2 flex text-xs ps-4'>
                      <button
                        type='button'
                        className='cursor-default px-1'
                        hidden={edited}>
                        <FaCheck className='text-green-600' />
                      </button>
                      {loading ? (
                        <p>Updating...</p>
                      ) : (
                        <p>
                          Edited{' '}
                          {moment(notes[index].updatedAt).startOf().fromNow()}
                        </p>
                      )}
                    </div>

                    <div className='flex justify-end me-2 text-sm'>
                      <button
                        hidden={loading}
                        className='px-4 py-1 rounded hover:bg-gray-100'
                        type='submit'>
                        Save
                      </button>
                      <button hidden={!loading}>
                        <ImSpinner2 className='animate-spin' />
                      </button>

                      <button
                        className='px-4 py-1 rounded hover:bg-gray-100'
                        type='button'
                        onClick={() => setShowModal(false)}>
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </div>
      ) : null}
    </div>
  )
}

export default NotesModal
