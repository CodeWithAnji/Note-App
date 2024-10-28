import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = ({setQuery}) => {
    const { user,logout } = useAuth()

    return (
        <nav className='bg-gray-800 p-4 text-white flex flex-wrap justify-between items-center'>
            <div className='text-xl font-bold'>
                <Link to="/">NoteApp</Link>
            </div>
            <div className='w-full sm:w-auto mt-2 sm:mt-0'>
                <input
                    type='text'
                    placeholder='Search notes....'
                    className='bg-gray-600 px-4 py-2 rounded w-full sm:w-auto border-none'
                    onChange={(e)=>setQuery(e.target.value)}
                />
            </div>
            <div className='flex items-center mt-2 sm:mt-0'>

                {!user ? (
                    <>
                        <Link to="/login" className='bg-blue-500 px-4 py-2 rounded mr-2 sm:mr-4'>
                            Login
                        </Link>
                        <Link to="/register" className='bg-blue-500 px-4 py-2 rounded mr-2 sm:mr-4'>
                            Signup
                        </Link>
                    </>
                )
                    :
                    (
                        <>
                            <span className='hidden sm:inline-block mr-4'>{user.name}</span>

                            <button className='bg-red-600 px-4 py-2 rounded text-pretty' onClick={logout}>
                                Logout
                                
                            </button>
                        </>
                    )}
            </div>
        </nav>

    );
};

export default Navbar;
