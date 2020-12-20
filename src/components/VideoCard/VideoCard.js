import React, {useEffect,useState} from 'react'
import './VideoCard.scss'
import './VideoSidecard.scss'
import Avatar from '@material-ui/core/Avatar'
import timeSince from '../../Utils/timeSince'
import axios from 'axios'

function VideoCard({ video, authorId, type }) {
       
    const time = timeSince(video.uploadDate)
    const [Author, setAuthor]=useState({})

    useEffect(()=>{
        async function fetchData(){
            await axios.get(process.env.REACT_APP_API_PREFIX+"/api/user/getUser",{params: {Id:authorId}}) 
            .then(function (response) {
                setAuthor(response.data)
              })
              .catch(function (error) {
                console.log(error);
              })             
            
        }
        fetchData()                       
    },[authorId])
    
    return (
        <div className={`${type}`}>
            <div className={`${type}_thumbnailContainer`}>
                <img className={`${type}_thumbnail`} src={video.thumbnail} alt="video thumbnail"/>
            </div>
        {type === "videoCard" ? 
            <div className={`${type}_videoDataContainer`}>    
                    <Avatar className={`${type}_avatar`} src={Author.avatar}/>
                <div className={`${type}_videoData`}>
                        <h1 className="title">{video.title}</h1>
                    <div className="mobile_media_design">
                            <h2 className="author" >{Author.username}</h2>
                        <div className={`${type}_videoStats`}>
                                <h2 className="views">{video.views} views •</h2>
                                <h2 className="date"> {time.time} {time.unit}{time.time > 1 ? "s" :""} ago</h2>
                        </div> 
                    </div>          
                </div>
            </div>
            :
            <div className="videoSidecard_videoDataContainer">    
                <div className="videoSidecard_videoData">
                        <h1>{video.title}</h1>
                    <div className="videoSidecard_dataText">
                            <h1>{Author.username}</h1>
                            <h2>{video.views} views </h2>
                            <h2> {time.time} {time.unit}{time.time > 1 ? "s" :""} ago</h2>   
                    </div>                                 
                </div>
            </div>}
        </div>
    )
}

export default VideoCard
