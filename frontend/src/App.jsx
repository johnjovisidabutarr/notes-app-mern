import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import RequireAuth from './component/RequireAuth'
import PersistLogin from './component/PersistLogin'
import Reminder from './pages/Reminder'
import Archive from './pages/Archive'
import Bin from './pages/Bin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route path='/' element={<RequireAuth />}>
              <Route path='/' element={<Home />} />
              <Route path='/reminder' element={<Reminder />} />
              <Route path='/archive' element={<Archive />} />
              <Route path='/bin' element={<Bin />} />
            </Route>
          </Route>
        </Route>

        <Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
