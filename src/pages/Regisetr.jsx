import { Link, useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const Regisetr = () => {
    const { handleSignup, handleRegisterWithGoogle } = useAuth()
    const [data, setData] = useState({});
    const navigate = useNavigate()

    const onSub = (e) => { handleSignup(e, data,navigate) }

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
                        onClick={() => handleRegisterWithGoogle(navigate)}
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