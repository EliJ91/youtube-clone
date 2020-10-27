import React, {useEffect,useState} from 'react'
import './VideoPage.scss'
import VideoSidebar from '../VideoSidebar/VideoSidebar'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ReplyIcon from '@material-ui/icons/Reply';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar'
import SortIcon from '@material-ui/icons/Sort';
import {useSelector} from 'react-redux';
import CommentCard from './CommentCard/CommentCard'
import axios from 'axios'

function VideoPage(props) {

    const [movie,setMovie]=useState()
    const [comment, setComment]=useState("")

    useEffect(()=>{
        async function fetchData(){
            await axios.get(process.env.REACT_APP_API_PREFIX+"/api/video/getVideo",{params:{movieId: props.match.params.movieId}}) 
            .then(function (response) {
                   setMovie(response.data)
                   
              })
              .catch(function (error) {
                console.log(error);
              })             
            
        }
        fetchData()                       
    },[props.match.params.movieId])
    
   
    const user = useSelector(state=>state)
    
        if(movie){             
            const video = movie.video.video
            const author = movie.video.author
            const comments = movie.video.comments 
        
            var date = new Date(video.uploadDate) 
            var MMM = date.toLocaleString('default', { month: 'short' })
            var dd = date.getDate()
            var yyyy = date.getFullYear() 
            
            console.log(comments)
        return (   
            <div className="videoPage">
                <div className="videoPage_videoData">   
                    <video className="videoPage_video" controls preload="auto" poster={video.thumbnail} src={video.videoURL} type='video/mp4' autoPlay/>
                    <h1>{video.title}</h1>   
                    <div className="videoPage_videoDataContainer">
                        <h1>{video.views} views • {`${MMM} ${dd}, ${yyyy}`}</h1>
                        <h2>
                            <ThumbUpAltIcon className="videoPage_clickable"/><span>{video.likes.length}</span>
                            <ThumbDownAltIcon className="videoPage_clickable"/><span>{video.dislikes.length}</span>
                            <ReplyIcon className="videoPage_clickable"/><span>SHARE</span>
                            <PlaylistAddIcon className="videoPage_clickable"/><span>SAVE</span>
                            <MoreHorizIcon className="videoPage_clickable"/>
                        </h2>
                    </div>
                    <div className="videoPage_authorInfo">
                        <div className="videoPage_leftContainer">
                            <div className="videoPage_avatar">
                                <Avatar src={author.userAvatar}/>
                            </div>
                            
                            <div className="videoPage_info">
                                <h1>{author.username}</h1>
                                <h2>{author.subscribers.length-1} Subscribers</h2>
                                <h3>{video.description}</h3>
                                <h4>SHOW MORE</h4>
                            </div>
                        </div>
                        <div className="videoPage_subscribe">
                            <div className="videoPage_button">SUBSCRIBE</div>
                        </div>
                    </div>
                    <div className="videoPage_commentHeader"> 
                        {comments.length} COMMENTS 
                        <p>
                            <SortIcon className="videoPage_sortIcon"/> SORT BY
                        </p>
                    </div>
                    <div className="videoPage_newComment">
                        <Avatar src={user.avatar}/>
                        <input placeholder="Add a public comment..." onChange={(e)=>setComment(e.target.value)}/>
                    </div>
                    <div className="videoPage_newCommentButton">
                        <div className="videoPage_cancelComment">Cancel</div>
                        <div className={`videoPage_submitComment ${comment !== "" disabled}`}>Comment</div>
                    </div>

                {comments.length > 0 ?  
                    comments.map((comment)=> 
                        <div>
                            <CommentCard commentData={comment}/>
                                {comment.repy ? comment.reply.map((reply)=>
                                    <CommentCard commentData={reply}/>)
                                :<></>}
                        </div>
                    )
                    :<></>}
                </div>
                <div className="videoPage_upNext">
                    <VideoSidebar/>
                </div>
            </div>
        )
        }else{
            return(
            <div>whoops</div>
            )
        }
                 
    
}

export default VideoPage

