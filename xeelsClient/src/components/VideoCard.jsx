import React, { useEffect, useRef, useState } from 'react';

const VideoCard = ({ id, videoUrl }) => {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef();

    useEffect(() => {
		const handlePlay = () => {
			const videos = document.querySelectorAll('.video')
			videos.forEach((video) => {
				if (video !== videoRef.current) {
					video.pause()
				}
			})
		}

		const loadVideo = (video) => {
			video.src = videoUrl
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadVideo(entry.target);
					entry.target.play()
					setPlaying(true)
				}
				else {
					entry.target.pause()
					setPlaying(false)
				}
			})
		}, { threshold: 0.5 })
		observer.observe(videoRef.current)

		videoRef.current.addEventListener('play', handlePlay)

		return () => {
			observer.disconnect();
			videoRef.current.removeEventListener('play', handlePlay)
		}
	}, [videoUrl])

    return (
        <div className='videoContainer w-full h-full relative'>
            <video ref={videoRef} className='video w-full h-full object-cover' key={id} loop>
                <source type='video/mp4'></source>
                Your Browser Does Not Support Video
            </video>
            <span className='absolute text-sm text-white top-1 left-0 right-0 p-3 z-10'>For You</span>
        </div>
    );
};

export default VideoCard;
