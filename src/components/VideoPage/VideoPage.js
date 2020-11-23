import React, {useEffect,useState} from 'react'
import './VideoPage.scss'
import VideoSidebar from '../VideoSidebar/VideoSidebar'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ReplyIcon from '@material-ui/icons/Reply';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'
import CommentSection from './CommentSection/CommentSection'
import {useSelector, useDispatch} from 'react-redux';
import {LOGGED_IN} from '../../redux/actions'




function VideoPage(props) {
    const dispatch = useDispatch()
    const movieId = props.match.params.movieId
    const moviePlaceholder = {
        authorId:null,
        comments: [],
        video:{
            description: "",
            dislikes: [],
            genre: "",
            likes: [],
            thumbnail: "",
            title: "",
            uploadDate: "Fri Oct 23 2020 15:39:59 GMT-0400 (Eastern Daylight Time)",
            videoURL: "",
            views: 0
        },
        _id: ""
    }

    const [movie,setMovie]=useState(moviePlaceholder)
    const [author, setAuthor]=useState({subscribers:[]})

    useEffect(()=>{
        async function fetchData(){
            await axios.get(process.env.REACT_APP_API_PREFIX+"/api/video/getVideo",{
                params:{
                    movieId: props.match.params.movieId
                }
            }) 
            .then(function (response) {
                   setMovie(response.data[0])
                   setAuthor(response.data[1])
              })
              .catch(function (error) {
                console.log(error);
              })   
        }
        axios.get(process.env.REACT_APP_API_PREFIX+"/api/video/addView",{params:{movieId: props.match.params.movieId}}) 
            
        fetchData()                       
    },[props.match.params.movieId])

   
                     
        const video = movie.video
        const user = useSelector(state => state)
        document.title = video.title

        var date = new Date(video.uploadDate) 
        var MMM = date.toLocaleString('default', { month: 'short' })
        var dd = date.getDate()
        var yyyy = date.getFullYear()

   async function likeVideo(){
      await axios.post(process.env.REACT_APP_API_PREFIX+"/api/video/likeVideo",{userId:user._id,movieId:movieId},{withCredentials:true}) 
            .then(function (response) {
                setMovie(response.data)
              })
              .catch(function (error) {
                console.log(error);
              }) 
    }

    async function dislikeVideo(){
        await axios.post(process.env.REACT_APP_API_PREFIX+"/api/video/dislikeVideo",{userId:user._id,movieId:movieId},{withCredentials:true}) 
              .then(function (response) {
                  setMovie(response.data)
                })
                .catch(function (error) {
                  console.log(error);
                }) 
    }

    async function subscribe(){
        await axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/subscribe",{userId:user._id,authorId:author.userId},{withCredentials:true}) 
              .then(function (response) {
                  setAuthor(response.data[1])
                  dispatch(LOGGED_IN(response.data[0]))
                })
                .catch(function (error) {
                  console.log(error);
                }) 
    }
            
        return (   
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
        )
}
                 
    


export default VideoPage

