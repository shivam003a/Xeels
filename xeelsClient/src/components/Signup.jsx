import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { startLoading, stopLoading } from '../Redux/Slices/userSlice'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import { z } from 'zod'
import { signupSchema } from '../validation/input.validation'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { logged, loading } = useSelector((state) => {
        return state.user
    })
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }))

        setFieldErrors((prev) => ({
            ...prev,
            [name]: ''
        }))
    }

    const handleSignup = async (e) => {
        e.preventDefault()

        dispatch(startLoading())
        const { name, email, password } = formData;

        try {
            signupSchema.parse({
                name,
                email,
                password
            })

            if (!name || !email || !password) {
                throw new Error("Fields can't be empty")
            }

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
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

        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = {}
                error.errors.forEach(({ path, message }) => {
                    errors[path[0]] = message
                })
                setFieldErrors(errors)
            }
            else {
                toast.error(error.message)
            }
        }
        dispatch(stopLoading())
    }

    const handleRefer = () => {
        dispatch(startLoading())
        navigate('/signin')
        dispatch(stopLoading())
    }

    useEffect(() => {
        dispatch(startLoading())
        if (logged) {
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
                                {
                                    fieldErrors?.name && (
                                        <span className='text-red-500 text-xs -mt-1 mb-1'>{fieldErrors.name}</span>
                                    )
                                }
                                <input className="px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type="email" placeholder='Enter Email' value={formData.email} name='email' onChange={handleInput}></input>
                                {
                                    fieldErrors?.email && (
                                        <span className='text-red-500 text-xs -mt-1 mb-1'>{fieldErrors.email}</span>
                                    )
                                }
                                <div className='w-full flex relative'>
                                    <input className="w-full px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type={showPassword ? 'text' : 'password'} placeholder='Enter Password' value={formData.password} name='password' onChange={handleInput}></input>
                                    {
                                        showPassword ? <IoMdEye className='absolute cursor-pointer right-2 top-2/4 -translate-y-2/4' size={18} onClick={() => setShowPassword(!showPassword)} /> : <IoMdEyeOff className='absolute cursor-pointer right-2 top-2/4 -translate-y-2/4' size={18} onClick={() => setShowPassword(!showPassword)} />
                                    }
                                </div>
                                {
                                    fieldErrors?.password && (
                                        <span className='text-red-500 text-xs -mt-1 mb-1'>{fieldErrors.password}</span>
                                    )
                                }
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
