import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from '../firebase/firebase';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Regisetr = () => {

    const navigate = useNavigate()
    const [data, setData] = useState({});
    const onSub = async (e) => {
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

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log(user);
            const userExists = await fetchDoc(user);

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

    const fetchDoc = async (user) => {
        const docRef = doc(db, "users", user.uid);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("User already exists:", docSnap.data());
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



    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    };
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-40 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={(e) => onSub(e)} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id='email'
                                onChange={handleInput}
                                autoComplete="email"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {false && <p className=' text-sm text-red-500 px-1.5'>{"errors.email.message"}</p>}
                        </div>
                    </div>
                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id='password'
                                onChange={handleInput}
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {false && <p className=' text-sm text-red-500 px-1.5'>{"errors.password.message"}</p>}
                        </div>
                    </div>
                    {/* DisplayName */}
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            DisplayName
                        </label>
                        <div className="mt-2">
                            <input
                                type='text'
                                id='displayName'
                                onChange={handleInput}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {false && <p className=' text-sm text-red-500 px-1.5'>{"errors.email.message"}</p>}
                        </div>
                    </div>
                    {/* Profile image */}
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Profile image
                        </label>
                        <div className="mt-2">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative w-full cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span className=' text-center'>Upload a file</span>
                                        <input id="photoURL" type="file" className="sr-only" onChange={(e) => { handleAddImage(e.target.files[0].name) }} />
                                    </label>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                            {false && <p className=' text-sm text-red-500 px-1.5'>{"errors.email.message"}</p>}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="divider w-56 mx-auto">OR</div>
                    <button
                        type="button"
                        onClick={handleLoginWithGoogle}
                        className=" items-center gap-3 flex w-full justify-center border-2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm"
                    >
                        Sign up with Google
                        <img className='w-5' src="https://cdn.iconscout.com/icon/free/png-256/free-google-231-432517.png?f=webp" alt="" />
                    </button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Have an account.?{' '}
                    <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>)
}

export default Regisetr