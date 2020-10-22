import React from 'react'
import './VideoPage.scss'
import SideBar from '../VideoSidebar/VideoSidebar'

function VideoPage(props) {

    console.log(props.location.state.v)
    const video = props.location.state.v
    return (
        <div className="backgroud"><div className="videoPage">
            
            <div className="videoPage__videoData">   
            <video className="video" controls preload="auto" poster={video.thumbnail} src={video.videoURL} type='video/mp4' autoPlay/>             
            </div>
            <div className="videoPage__upNext">
                <SideBar/>
            </div>
            </div>            
        </div>
    )
}

export default VideoPage
