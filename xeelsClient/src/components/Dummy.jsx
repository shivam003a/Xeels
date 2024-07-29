import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setLoggedOut } from '../Redux/Slices/userSlice'
import toast from 'react-hot-toast'

const Dummy = () => {

    const dispatch = useDispatch()

    const verifyUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/verify`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include"
            })

            if (res.status === 200) {
                dispatch(setLoggedIn())
            }
            else {
                dispatch(setLoggedOut())
            }

        } catch (e) {
            toast.error(e.message)
        }
    }

    useEffect(() => {
        verifyUser();
    }, [])


    return (
        <></>
    )
}

export default Dummy
