import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import app from '../Firebase/firebase'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startLoading, stopLoading } from '../Redux/Slices/userSlice'
import Loading from './Loading'
import Navigate from './Navigate'

const Upload = () => {

    const dispatch = useDispatch()
    const { loading, logged } = useSelector((state) => {
        return state.user
    })
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [video, setVideo] = useState(null)
    const [videoProgress, setVideoProgress] = useState(0)
    const [videoUrl, setVideoUrl] = useState('')

    useEffect(() => {
        const upload = async () => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + video.name
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, video);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setVideoProgress(progress)
                    switch (snapshot.state) {
                        case "paused":
                            console.log('paused')
                            break;
                        case 'running':
                            console.log('upload running')
                            break
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setVideoUrl(downloadURL)
                    })
                }
            )
        }
        video && upload()
    }, [video])

    const handleUpload = async (e) => {
        e.preventDefault()

        dispatch(startLoading())
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/xeels`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    title, videoUrl
                }),
                credentials: "include"
            })

            const data = await res.json()

            if (res.status === 200) {
                toast.success(data.message)
                setVideo(null)
                setTitle("")
                setVideoUrl("")
            }
            else {
                toast.error(data.message)
            }
 
        } catch (e) {
            toast.error(e.message)
        }
        dispatch(stopLoading())
    }

    const handleLogo = () => {
        dispatch(startLoading())
        navigate('/xeels')
        dispatch(stopLoading())
    }

    return (
        <>
            {
                logged?(
                    loading ? (<Loading />) : (
                    <div className='w-full h-screen'>
                        <div className='text-2xl font-bold px-2 py-3 cursor-pointer' onClick={handleLogo}>XEELS</div>
                        <div className="w-full h-full px-2 py-3">
                            <div className='flex flex-col gap-2 mt-5'>
                                <div className='mb-3'>
                                    <span className='text-xl'>UPLOAD XEELS</span>
                                    <div className='w-[50px] h-[1px] bg-black'></div>
                                </div>
                                <input className="px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type='file' name='video' accept='video/*' onChange={(e) => { setVideo(e.target.files[0]) }} />
                                <div className='px-3 py-2 border-2 focus:bottom-0 focus:outline-none'>{videoProgress}%</div>
                                <input className="px-3 py-2 border-2 focus:bottom-0 focus:outline-none" type='text' name='title' placeholder='title' onChange={(e) => { setTitle(e.target.value) }} />
                                <button className='px-3 py-2 border bg-black text-white mt-4 font-semibold focus:bottom-0 focus:outline-none disabled' onClick={handleUpload} disabled={!videoUrl}>Upload</button>
                            </div>
                        </div>
                    </div>
                )
                ): (<Navigate />)
            }
        </>
    )
}

export default Upload
