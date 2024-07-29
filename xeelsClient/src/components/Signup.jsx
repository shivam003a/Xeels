import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { startLoading, stopLoading } from '../Redux/Slices/userSlice'
import { useSelector } from 'react-redux'
import Loading from './Loading'

const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { logged, loading } = useSelector((state) => {
        return state.user
    })
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        pin: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSignup = async (e) => {
        e.preventDefault()

        dispatch(startLoading())
        const { name, email, password, pin } = formData;

        try {

            if (!name || !email || !password || !pin) {
                throw new Error("Fields can't be empty")
            }

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name, email, password, pin
                }),
                credentials: "include"
            })

            const data = await res.json()

            if (res.status === 200) {
                toast.success(data.message)
                navigate('/signin')
            }
            else {
                toast.error(data.message)
            }

        } catch (e) {
            toast.error(e.message)
        }
        dispatch(stopLoading())
    }

    const handleRefer = () => {
        dispatch(startLoading())
        navigate('/signin')
        dispatch(stopLoading())
    }

    useEffect(()=>{
        dispatch(startLoading())
        if(logged){
            navigate('/xeels')
        }
        dispatch(stopLoading())
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
                                    <span className='text-xl'>SIGN UP</span>
                                    <div className='w-[50px] h-[1px] bg-black'></div>
                                </div>
                                <input className="px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type="text" placeholder='Enter Name' value={formData.name} name='name' onChange={handleInput}></input>
                                <input className="px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type="email" placeholder='Enter Email' value={formData.email} name='email' onChange={handleInput}></input>
                                <input className="px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type="password" placeholder='Enter Password' value={formData.password} name='password' onChange={handleInput}></input>
                                <input className="px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type="text" placeholder='Enter PIN' value={formData.pin} name='pin' onChange={handleInput}></input>
                                <button className="px-3 py-2 border bg-black text-white mt-4 font-semibold focus:bottom-0 focus:outline-none" onClick={handleSignup}>SIGN UP</button>
                                <span className='text-sm text-[#404040]'>Already Signed up! <span className='underline cursor-pointer' onClick={handleRefer}>Sign in Here</span></span>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Signup
