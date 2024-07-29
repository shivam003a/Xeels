import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { setLoggedIn, setLoggedOut, startLoading, stopLoading } from '../Redux/Slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'

const Signin = () => {
    const dispatch = useDispatch()
    const { logged, loading } = useSelector((state) => {
        return state.user
    })
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSignin = async (e) => {
        e.preventDefault()

        dispatch(startLoading())
        const { email, password } = formData;

        try {
            if (!email || !password) {
                throw new Error("Fields can't be empty")
            }

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email, password
                }),
                credentials: "include"
            })

            const data = await res.json();

            if (res.status === 200) {
                toast.success(data.message)
                dispatch(setLoggedIn())
                navigate('/xeels')
            }
            else {
                toast.error(data.message)
                dispatch(setLoggedOut())
            }

        } catch (e) {
            toast.error(e.message)
        }
        dispatch(stopLoading())
    }

    const handleRefer = () => {
        dispatch(startLoading())
        navigate('/signup')
        dispatch(stopLoading())
    }

    useEffect(()=>{
        if(logged){
            navigate('/xeels')
        }
    }, [logged])

    return (
        <>
            {
                loading ? (<Loading />) : (
                    <div className='w-full h-screen'>
                        <div className='text-2xl font-bold px-2 py-3'>XEELS</div>
                        <div className="w-full h-full px-2 py-3">
                            <div className='flex flex-col gap-2 mt-5'>
                                <div className='mb-3'>
                                    <span className='text-xl'>SIGN IN</span>
                                    <div className='w-[50px] h-[1px] bg-black'></div>
                                </div>
                                <input className="px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type="email" placeholder='Enter Email' value={formData.email} name='email' onChange={handleInput}></input>
                                <input className="px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type="password" placeholder='Enter Password' value={formData.password} name='password' onChange={handleInput}></input>
                                <button className="px-3 py-2 border bg-black text-white mt-4 font-semibold focus:bottom-0 focus:outline-none" onClick={handleSignin}>SIGN IN</button>
                                <span className='text-sm text-[#404040]'>Not Registered Yet! <span className='underline cursor-pointer' onClick={handleRefer}>Sign up Here</span></span>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Signin
