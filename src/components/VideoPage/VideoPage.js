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
                <div className="videoPage__videoData">   
                    <video className="video" controls preload="auto" poster={video.thumbnail} src={video.videoURL} type='video/mp4' autoPlay/>
                    <h1>{video.title}</h1>   
                    <div className="videoPage__vidDataContainer">
                        <h1>{video.views} views • {`${MMM} ${dd}, ${yyyy}`}</h1>
                        <h2>
                            <ThumbUpAltIcon className="clickable"/><span>{video.likes.length}</span>
                            <ThumbDownAltIcon className="clickable"/><span>{video.dislikes.length}</span>
                            <ReplyIcon className="clickable"/><span>SHARE</span>
                            <PlaylistAddIcon className="clickable"/><span>SAVE</span>
                            <MoreHorizIcon className="clickable"/>
                        </h2>
                    </div>
                    <div className="videoPage__authorInfo">
                        <div className="videoPage__authorInfo__leftContainer">
                            <div className="videoPage__authorInfo__avatar">
                                <Avatar src={author.userAvatar}/>
                            </div>
                            
                            <div className="videoPage__authorInfo__info">
                                <h1>{author.username}</h1>
                                <h2>{author.subscribers.length-1} Subscribers</h2>
                                <h3>{video.description}</h3>
                              <h4>SHOW MORE</h4>
                            </div>
                        </div>
                        <div className="videoPage__authorInfo__subscribe">
                            <div className="videoPage__authorInfo__subscribe__Button">SUBSCRIBE</div>
                        </div>
                    </div>
                    <div className="videoPage__commentHeader"> {comments.length} COMMENTS <p><SortIcon className="videoPage__commentHeader __sortIcon"/> SORT BY</p></div>
                    <div className="videoPage__newComment">
                        <Avatar src={user.avatar}/>
                        <input placeholder="Add a public comment..."/>
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
                <div className="videoPage__upNext">
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

