import React from 'react'
import './VideoPage.scss'
import VideoSidebar from '../VideoSidebar/VideoSidebar'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ReplyIcon from '@material-ui/icons/Reply';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function VideoPage(props) {

    console.log(props.location.state.v)
    const video = props.location.state.v

    var date = new Date(video.uploadDate)
    var MMM = date.toLocaleString('default', { month: 'short' })
    var dd = date.getDate()
    var yyyy = date.getFullYear()
    return (
        
            <div className="videoPage">
                <div className="videoPage__videoData">   
                    <video className="video" controls preload="auto" poster={video.thumbnail} src={video.videoURL} type='video/mp4' autoPlay/>
                    <h1>{video.title}</h1>   
                    <div className="videoPage__vidDataContainer">
                        <h1>{video.views} views • {`${MMM} ${dd}, ${yyyy}`}</h1>
                        <h2>
                            <ThumbUpAltIcon/><span>{video.likes}</span>
                            <ThumbDownAltIcon/><span>{video.dislikes}</span>
                            <ReplyIcon/><span>SHARE</span>
                            <PlaylistAddIcon/><span>SAVE</span>
                            <MoreHorizIcon/>
                        </h2>
                    </div>
                </div>
                <div className="videoPage__upNext">
                    <VideoSidebar/>
                </div>
            </div>            
        
    )
}

export default VideoPage

