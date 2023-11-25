import { Outlet } from 'react-router-dom'
import NavigationBar from './component/NavigationBar'
import SideBar from './component/SideBar'

const Layout = () => {
  return (
    <main>
      <NavigationBar />
      <div className='flex flex-row'>
        <SideBar />
        <div className='pt-20 w-full'>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default Layout
