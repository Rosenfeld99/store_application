import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const { handleLoginWithGoogle } = useAuth()
    const navigate = useNavigate()
    const onSub = (e) => {
        e.preventDefault()
        const parent = /^\S+@\S+$/i
        const email = e.target[0].value
        const password = e.target[1].value

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // console.log(user);
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-40 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={(e) => onSub(e)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {false && <p className=' text-sm text-red-500 px-1.5'>{"errors.email.message"}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {false && <p className=' text-sm text-red-500 px-1.5'>{"errors.password.message"}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                    <div className="divider w-56 mx-auto">OR</div>
                    <button
                        type="button"
                        onClick={() => handleLoginWithGoogle(navigate)}
                        className=" items-center gap-3 flex w-full justify-center border-2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm"
                    >
                        Sign in with Google
                        <img className='w-5' src="https://cdn.iconscout.com/icon/free/png-256/free-google-231-432517.png?f=webp" alt="" />
                    </button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account.?{' '}
                    <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Register
                    </Link>
                </p>
            </div>
        </div>)
}

export default Login