import { useContext } from 'react'
import {
  BiBulb,
  BiArchiveIn,
  BiBell,
  BiTrash,
  BiPowerOff,
} from 'react-icons/bi'
import useAuth from '../hooks/useAuth'
import useAxiosJWT from '../hooks/useAxiosJWT'
import { Link, useNavigate } from 'react-router-dom'
import SidebarContext from '../context/SidebarContextProvider'

const SideBar = () => {
  const { sidebar, setName } = useContext(SidebarContext)
  const { setAuth } = useAuth()
  const axiosJWT = useAxiosJWT()

  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await axiosJWT.delete('/api/users/logout')
    if (response.status == 200) {
      setAuth(null)
      navigate('/login')
    }
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 lg:w-1/6 font-semibold text-sm text-gray-700 ${
        !sidebar ? 'hidden' : ''
      }  `}>
      <div className='pt-20 ps-1'>
        <Link
          onClick={() => setName('Notes App')}
          to={'/'}
          className={`flex items-center p-3 mb-3 cursor-pointer  rounded-r-full  ${
            location.pathname == '/'
              ? 'bg-yellow-300 focus:bg-yellow-300'
              : 'hover:bg-gray-100'
          }`}>
          <BiBulb className='text-2xl mr-6' />
          <p>Notes</p>
        </Link>
        <Link
          onClick={() => setName('Reminder')}
          to={'/reminder'}
          className={`flex items-center p-3 mb-3 cursor-pointer  hover:rounded-r-full rounded-r-full ${
            location.pathname == '/reminder'
              ? 'bg-yellow-300 focus:bg-yellow-300'
              : 'hover:bg-gray-100'
          }`}>
          <BiBell className='text-2xl mr-6' />
          <p>Reminder</p>
        </Link>
        <Link
          onClick={() => setName('Archive')}
          to={'/archive'}
          className={`flex items-center p-3 mb-3 cursor-pointer hover:rounded-r-full rounded-r-full ${
            location.pathname == '/archive'
              ? 'bg-yellow-300 focus:bg-yellow-300'
              : 'hover:bg-gray-100'
          }`}>
          <BiArchiveIn className='text-2xl mr-6' />
          <p>Archive</p>
        </Link>
        <Link
          onClick={() => setName('Bin')}
          to={'/bin'}
          className={`flex items-center p-3 mb-3 cursor-pointer hover:rounded-r-full rounded-r-full ${
            location.pathname == '/bin'
              ? 'bg-yellow-300 focus:bg-yellow-300'
              : 'hover:bg-gray-100'
          }`}>
          <BiTrash className='text-2xl mr-6' />
          <p>Bin</p>
        </Link>
        <button
          className='flex items-center p-3 mb-3 cursor-pointer hover:bg-red-300 hover:rounded-full absolute bottom-10'
          onClick={() => handleLogout()}>
          <BiPowerOff className='text-2xl mr-6' />
          <p>Sign Out</p>
        </button>
      </div>
    </div>
  )
}

export default SideBar
