import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const useAuth = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext)

    // console.log(currentUser);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            getUserExists(user, setCurrentUser)
            // setCurrentUser(user)
            console.log(currentUser);
        })
        return () => {
            unsub()
        }
    }, [])

    const getUserExists = async (user, setCurrentUser) => {
        const docRef = doc(db, "users", user?.uid);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("User already exists:", docSnap.data());
                //   if have argument state updated!
                setCurrentUser && setCurrentUser(docSnap.data());
                return true; // User exists
            } else {
                console.log("User does not exist");
                return false; // User does not exist
            }
        } catch (error) {
            console.error("Error fetching user document:", error);
            return false; // Assume user does not exist in case of an error
        }
    };

    const handleSignup = async (e, data, navigate) => {
        e.preventDefault();
        console.log(data);
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await setDoc(doc(db, "users", res.user.uid), {
                email: data.email,
                displayName: data.displayName,
                photoURL: data.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                role: "user",
                timeStamp: serverTimestamp(),
            });
            navigate('/login')
        } catch (err) {
            console.log(err);
        }
    }

    const handleRegisterWithGoogle = async (navigate) => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log(user);
            const userExists = await getUserExists(user);

            if (!userExists) {
                // User does not exist, create a new document with the user's uid as the document ID
                const newUserRef = await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    role: "user",
                    date: serverTimestamp()
                });

                console.log("New user created with ID: ", user.uid);
            } else {
                // User already exists, do additional login-related logic if needed
                console.log("User already exists");
            }
        } catch (error) {
            console.error(error);
        }

        navigate('/');
    };

    const handleSignOut = async (e, navigate) => {
        e.preventDefault()

        signOut(auth).then(() => {
            // Sign-out successful.
            setCurrentUser(null)
            navigate('/login')
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    const handleLoginWithGoogle = async (navigate) => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
        navigate('/')
    }

    return { currentUser, setCurrentUser, getUserExists, handleRegisterWithGoogle, handleSignup, handleSignOut, handleLoginWithGoogle }
}

export default useAuth