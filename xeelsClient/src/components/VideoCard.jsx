import React, { forwardRef, useEffect, useRef, useState } from 'react';
import menu from '../assets/menu.png'
import Navigate from './Navigate'
import { useNavigate } from 'react-router-dom';

const VideoCard = forwardRef(({ videoUrl }, ref) => {
	const [playing, setPlaying] = useState(false);
	const videoRef = useRef();
	const observeRef = useRef(null)
	const navigate = useNavigate()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const handleMenu = () => {
		// navigate('/navigate')
		setIsMenuOpen(prev=> !prev)
	}

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

		observeRef.current = new IntersectionObserver((entries) => {
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
		}, { threshold: 0.3 })

		if (videoRef.current) {
			observeRef.current.observe(videoRef.current);
			videoRef.current.addEventListener('play', handlePlay);
		}

		return () => {
			if (videoRef.current) {
				observeRef.current.unobserve(videoRef.current);
				videoRef.current.removeEventListener('play', handlePlay);
			}
		}
	}, [videoUrl])

	const handleMouseDown = (e) => {
		e.preventDefault()
		if (videoRef.current) {
			videoRef.current.pause();
			setPlaying(false);
		}
	};

	const handleMouseUp = () => {
		if (videoRef.current) {
			videoRef.current.play();
			setPlaying(true);
		}
	};

	return (
		<div className='videoContainer w-full h-full relative flex'>
			<video ref={(node) => {
				videoRef.current = node
				if (ref) {
					ref.current = node
				}
			}}
				className={`video ${isMenuOpen?"w-[4%]": "w-full"} h-full object-cover menu`}
				loop
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onTouchStart={handleMouseDown}
				onTouchEnd={handleMouseUp}
				controlsList='nodownload'
				onContextMenu={(e)=> e.preventDefault()}>
				<source type='video/mp4'></source>
				Your Browser Does Not Support Video
			</video>
			<div className='absolute top-1 left-0 right-0 p-3 z-10 flex justify-between items-center'>
				<span className='text-sm text-white'>For You</span>
				<img src={menu} className={`w-[16px] ${isMenuOpen?"invert-0":"invert"} cursor-pointer`} onClick={handleMenu} />
			</div>


			<div className={`h-full ${isMenuOpen?"w-full":"w-[0px]"} menu`}>
				<Navigate />
			</div>
		</div>
	);
});

export default VideoCard;
