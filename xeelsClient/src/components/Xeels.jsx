import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { startLoading, stopLoading } from '../Redux/Slices/userSlice'
import Loading from './Loading'
import VideoCard from './VideoCard'

const Xeels = () => {

    const dispatch = useDispatch()
    const { loading, page } = useSelector((state) => {
        return state.user
    })
    const navigate = useNavigate()
    const [xeelsList, setXeelsList] = useState([]);

    const getVideo = async () => {
        const newHeaders = new Headers();
        newHeaders.append("Content-Type", "application/json");
        newHeaders.append("Accept", "application/json");

        dispatch(startLoading())
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/xeels?page=${page}&limit=4`, {
                method: "GET",
                headers: newHeaders,
                credentials: "include"
            })
            const data = await res.json();

            if (res.status === 200) {
                setXeelsList(prev => [...prev, ...data.response])
                toast.success(`Xeels Page ${page} Fetched`)
            }
            else {
                navigate('/signin')
                toast.error('Error Occured')
            }
        } catch (e) {
            toast.error(e.message)
        }
        dispatch(stopLoading())
    }

    useEffect(() => {
        getVideo();
    }, [page])

    return (
        <>
            {
                loading ? (<Loading />) : (
                    <div className="w-full h-screen videoBox overflow-x-hidden overflow-y-scroll">
                        {
                            xeelsList && xeelsList.map((xeels) => {
                                return <VideoCard videoUrl={xeels.videoUrl} key={xeels._id} id={xeels._id} />
                            })
                        }
                    </div>
                )
            }
        </>
    )
}

export default Xeels
