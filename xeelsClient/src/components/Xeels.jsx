import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { incrementPage, startLoading, stopLoading } from '../Redux/Slices/userSlice'
import Loading from './Loading'
import VideoCard from './VideoCard'

const Xeels = () => {

    const dispatch = useDispatch()
    const { loading, page } = useSelector((state) => {
        return state.user
    })
    const navigate = useNavigate()
    const [xeelsList, setXeelsList] = useState([]);
    const lastRef = useRef(null)

    const getVideo = async () => {

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/xeels?page=${page}&limit=4`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();

            if (res.status === 200) {
                setXeelsList(prev => [...prev, ...data.response])
            }
            else {
                navigate('/signin')
                toast.error('Error Occured')
            }
        } catch (e) {
            toast.error(e.message)
        }
    }

    useEffect(() => {
        getVideo();
    }, [page])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                dispatch(incrementPage())
            }
        }, { threshold: 0.5 })

        if (lastRef.current) {
            observer.observe(lastRef.current)
        }

        return () => {
            if (lastRef.current) {
                observer.unobserve(lastRef.current)
            }
        }
    }, [xeelsList])

    return (
        <>
            {
                loading ? (<Loading />) : (
                    <div className="w-full h-screen videoBox overflow-x-hidden overflow-y-scroll">
                        {
                            xeelsList && xeelsList.map((xeels, index) => {
                                let isLast = (xeelsList.length - 1 == index)
                                return <VideoCard videoUrl={xeels.videoUrl} key={xeels._id} ref={isLast ? lastRef : null} />
                            })
                        }
                    </div>
                )
            }
        </>
    )
}

export default Xeels
