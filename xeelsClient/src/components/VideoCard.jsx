import React from 'react'

const VideoCard = ({videoUrl, id}) => {
    return (
        <video className="w-full h-full object-cover" key={id} autoPlay loop>
            <source src={videoUrl} type="video/mp4"></source>
            Your Browser Does not support video
        </video>
    )
}

export default VideoCard
