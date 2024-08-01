import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setLoggedOut, startLoading, stopLoading } from '../Redux/Slices/userSlice'
import Loading from './Loading'

const Navigate = () => {
    const dispatch = useDispatch()
    const { logged, loading } = useSelector((state) => {
        return state.user
    })
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const handleSignout = async () => {
        dispatch(startLoading())
        try {
            const resposne = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signoff`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include"
            })

            if (resposne.status === 200) {
                toast.success("Signed out")
                dispatch(setLoggedOut())
                navigate('/signin')
            } else {
                dispatch(setLoggedOut())
                navigate('/signin')
            }

        } catch (e) {
            toast.error(e.message)
        }
        dispatch(stopLoading())
    }

    return (
        <>
            {
                loading ? (<Loading />) : (
                    <div className='w-full h-screen flex justify-center items-center'>
                        <div className='w-8/12 p-6 grid grid-cols-2 grid-rows-2 gap-4 justify-center items-center my-auto'>
                            <button className='aspect-square bg-black text-white text-sm rounded-full' onClick={handleBack}>Go back</button>
                            {logged && <button className='aspect-square bg-black text-white text-sm rounded-full' onClick={() => navigate('/upload')}>Upload</button>}
                            <button className='aspect-square bg-black text-white text-sm rounded-full'>Contact</button>
                            {logged && <button className='aspect-square bg-black text-white text-sm rounded-full' onClick={handleSignout}>Signout</button>}
                            {!logged && <button className='aspect-square bg-black text-white text-sm rounded-full' onClick={() => navigate('/signin')}>Signin</button>}
                            {!logged && <button className='aspect-square bg-black text-white text-sm rounded-full' onClick={() => navigate('/signup')}>Signup</button>}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Navigate
