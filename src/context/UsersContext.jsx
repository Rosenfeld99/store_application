import React, { createContext, useState } from 'react'

export const UsersContext = createContext()

export const UsersContextProvider = ({ children }) => {
    const [usersList, setUsersList] = useState([])


    return (
        <UsersContext.Provider value={{usersList, setUsersList }}>
            {children}
        </UsersContext.Provider>
    )
}