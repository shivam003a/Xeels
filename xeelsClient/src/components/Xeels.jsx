import React, { useEffect, useRef, useState } from 'react'
import './Xeels.css'
import { useSwipeable } from 'react-swipeable';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { startLoading, stopLoading } from '../Redux/Slices/userSlice'
import Loading from './Loading'
import VideoCard from './VideoCard'

const Xeels = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector((state) => {
        return state.user
    })
    const myRef = useRef()
    const navigate = useNavigate()
    const [xeelsList, setXeelsList] = useState([]);
    const [index, setIndex] = useState(0);
    const [page, setPage] = useState(1)

    const getVideo = async () => {
        const newHeaders = new Headers();
        newHeaders.append("Content-Type", "application/json");
        newHeaders.append("Accept", "application/json");

        dispatch(startLoading())
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/xeels?page=${page}&limit=10`, {
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

    const onSwipeUp = () => {
        dispatch(startLoading())
        if (index < xeelsList.length - 1) {
            setIndex(index + 1);
        }
        else if (index === xeelsList.length - 1) {
            setPage(page + 1);
        }
        dispatch(stopLoading())
    }

    const onSwipeDown = () => {
        dispatch(startLoading())
        if (index > 0) {
            setIndex(index - 1);
        }
        else {
            setXeelsList([])
            setPage(1)
        }
        dispatch(stopLoading())
    }

    const onSwipeLeft = () => {
        dispatch(startLoading())
        navigate('/navigate')
        dispatch(stopLoading())
    }


    const handlers = useSwipeable({
        delta: 30,
        onSwipedUp: onSwipeUp,
        onSwipedDown: onSwipeDown,
        onSwipedLeft: onSwipeLeft,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
        trackTouch: true
    })

    useEffect(() => {
        getVideo();
    }, [page])

    return (
        <>
            {
                loading ? (<Loading />) : (
                    <div ref={myRef}>
                        <div {...handlers} className="w-full h-screen videoBox relative">
                            {
                                xeelsList[index] && <VideoCard videoUrl={xeelsList[index].videoUrl} id={xeelsList[index]._id}/>
                            }
                            <span className='absolute text-sm text-white top-1 left-0 right-0 p-3 z-10'>For You</span>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Xeels
