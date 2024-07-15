import React, { useContext } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import {  db } from '../firebase/firebase'
import { UsersContext } from '../context/UsersContext'

const useUser = () => {
    const { usersList, setUsersList } = useContext(UsersContext)

    const fetchUsers = async () => {

        try {
            const dataList = []
            const q = query(collection(db, "users"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                dataList.push({ id: doc.id, ...doc.data() })
                // console.log(doc.id, " => ", doc.data());
            });
            setUsersList(dataList)
        } catch (error) {
            console.log(error);
        }
    }

    return { fetchUsers, usersList, setUsersList, }
}

export default useUser