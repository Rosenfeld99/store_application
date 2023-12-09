import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { getUserExists } from '../utils/func/firebaseFunc'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            getUserExists(user,setCurrentUser)
            // setCurrentUser(user)
            console.log(currentUser);
        })

        return () => {
            unsub()
        }
    }, [])

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}