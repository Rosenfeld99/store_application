import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

const AuthAndCurrency = () => {
    const { currentUser } = useContext(AuthContext)
    // console.log(currentUser);
    return (
        <div className="flex h-10 items-center justify-between bg-[#121826] px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            <div className="flex">
                <a href="#" className="flex items-center text-white hover:text-gray-800">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/234px-Flag_of_Israel.svg.png"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">שקל</span>
                    <span className="sr-only">, change currency</span>
                </a>
            </div>
            {/* Messages of promotions */}
            {/* <div>
                Sale new year... 
            </div> */}

            {!currentUser && <div className="flex lg:flex-1 lg:items-center lg:justify-end space-x-6">
                <Link to="/login" className="text-sm font-medium text-white hover:text-gray-800">
                    Sign in
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <Link to="/register" className="text-sm font-medium text-white hover:text-gray-800">
                    Create account
                </Link>
            </div>}
        </div>
    )
}

export default AuthAndCurrency