import React from 'react'
import './VideoPage.scss'

function VideoPage(props) {

    console.log(props.location.state.v)
    const video = props.location.state.v
    return (
        <div className="videoPage">
            <video className="video" controls preload="auto" poster={video.thumbnail} src={video.videoURL} type='video/mp4' autoPlay/>
                
        </div>
    )
}

export default VideoPage
