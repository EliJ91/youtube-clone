import React from 'react'
import './VideoPage.scss'
import VideoSidebar from '../VideoSidebar/VideoSidebar'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ReplyIcon from '@material-ui/icons/Reply';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar'
import CommentSection from './CommentSection/CommentSection'
import useVideoPageLogic from './VideoPageLogic'
import Sidebar from '../Sidebar/Sidebar'
import Logo from '../Header/img/logo.svg'
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom'

function VideoPage(props) {
    const {movie,author,video,user,MMM,dd,yyyy,likeVideo,dislikeVideo,subscribe} = useVideoPageLogic(props.match.params.movieId,props.expandSidebar,props.setExpandSidebar)
    document.body.style.overflow = "visible"
        return (   
            <>
            {/* Header */}
            <div className={`videoPage_Sidebar_Background ${props.expandSidebar && "expanded"}`} onClick={()=>{props.setExpandSidebar(false)}}></div>
            <div className={`videoPage_Sidebar ${props.expandSidebar && "expanded"}`}>
                <div className="videoPage_Sidebar_header">
                    <MenuIcon className="videoPage_Sidebar_menuIcon" onClick={()=>{props.setExpandSidebar(!props.expandSidebar)}}/>
                    <Link to='/' ><img className="videoPage_Sidebar_logo" src={Logo} alt=""/></Link>
                </div>
                
                <Sidebar  expandSidebar={true} />
            </div>
            
            {/* Main Page */}
            <div className="videoPage">
                <div className="videoPage_videoData">   
                <div className="videoPage_videoContainer">
                    <video className="video" controls preload="auto" poster={video.thumbnail} src={video.videoURL} type='video/mp4' autoPlay/>
                </div>
                    <h1>{video.title}</h1>   
                    <div className="videoPage_videoDataContainer">
                        <h1>{video.views} views • {`${MMM} ${dd}, ${yyyy}`}</h1>
                        <h2>
                            <ThumbUpAltIcon onClick={()=>likeVideo()} className={`videoPage_clickIcon ${video.likes.includes(user._id) && "likeDislike"}`} /><span>{video.likes.length}</span>
                            <ThumbDownAltIcon onClick={()=>dislikeVideo()} className={`videoPage_clickIcon ${video.dislikes.includes(user._id) && "likeDislike"}`}/><span>{video.dislikes.length}</span>
                            <ReplyIcon className="videoPage_clickable"/><span>SHARE</span>
                            <PlaylistAddIcon className="videoPage_clickable"/><span>SAVE</span>
                            <MoreHorizIcon className="videoPage_clickable"/>
                        </h2>
                    </div>
                    <div className="videoPage_authorInfo">
                        <div className="videoPage_leftContainer">
                            <div className="videoPage_avatar">
                                <Avatar src={author.avatar}/>
                            </div>
                            
                            <div className="videoPage_info">
                                <h1>{author.username}</h1>
                                <h2>{author.subscribers.length} Subscribers</h2>
                                <h3>{video.description}</h3>
                                <h4>SHOW MORE</h4>
                            </div>
                        </div>
                        <div className="videoPage_subscribe">
                            {author.subscribers.includes(user._id) ?
                            <div onClick={()=>subscribe()} className="videoPage_button">SUBSCRIBED</div> : <div onClick={()=>subscribe()} className="videoPage_button">SUBSCRIBE</div>}
                        </div>
                    </div>
                    
                <CommentSection data={movie}/>
            </div>

            <div className="videoPage_upNext">
                    <VideoSidebar/>
            </div>
        </div>
        </>
        )
}
                 
    


export default VideoPage

