import React from 'react'
import './VideoPage.scss'
import VideoSidebar from '../VideoSidebar/VideoSidebar'

function VideoPage(props) {

    console.log(props.location.state.v)
    const video = props.location.state.v
    return (
        <div className="background">
            <div className="videoPage">
                <div className="videoPage__videoData">   
                    <video className="video" controls preload="auto" poster={video.thumbnail} src={video.videoURL} type='video/mp4' autoPlay/>             
                </div>
                <div className="videoPage__upNext">
                    <VideoSidebar/>
                </div>
            </div>            
        </div>
    )
}

export default VideoPage
