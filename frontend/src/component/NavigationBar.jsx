import { useContext } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

import SidebarContext from '../context/SidebarContextProvider'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  const { sidebar, setSidebar, name } = useContext(SidebarContext)

  return (
    <nav className='bg-white border absolute w-full text-gray-700'>
      <div className='max-w-7xl px-2 sm:px-6 lg:px-4'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 sm:items-stretch sm:justify-start'>
            <div className='flex flex-shrink-0 items-center'>
              <button
                className='text-lg px-2'
                onClick={() => setSidebar(!sidebar)}>
                <GiHamburgerMenu />
              </button>
              <Link to={'/'} className='flex items-center ms-3 space-x-1'>
                {name == 'Notes App' && (
                  <img
                    src='/img/icon_notes.png'
                    alt='img'
                    className='h-9 w-9'
                  />
                )}

                <h3 className='text-2xl font-semibold capitalize'>{name}</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default NavigationBar
