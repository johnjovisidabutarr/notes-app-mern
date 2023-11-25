import { createContext, useState } from 'react'

const SidebarContext = createContext({})

export const SidebarContextProvider = ({ children }) => {
  const names =
    location.pathname == '/'
      ? 'Notes App'
      : location.pathname.toString().slice(1)
  const [sidebar, setSidebar] = useState(true)
  const [name, setName] = useState(names)

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar, name, setName }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContext
