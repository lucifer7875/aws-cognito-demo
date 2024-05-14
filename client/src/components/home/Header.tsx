import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return (
        <div>
            <header className="text-gray-600 body-font absolute top-0 right-0 w-full bg-slate-300 p-5 flex justify-end">


                <button className="inline-flex items-center bg-red-700 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base mt-4 md:mt-0 text-white" onClick={() => navigate("/")}>
                    Log Out
                </button>
            </header>
        </div>
    )
}

export default Header