import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './RecommendedVideos.scss'
import VideoCard from '../VideoCard/VideoCard'
import axios from 'axios'



function RecomendedVideos(props) {
    const [allVideos, setAllVideos]=useState([])

    useEffect(()=>{
        props.setExpandSidebar(false)
        async function fetchData(){
            await axios.get(process.env.REACT_APP_API_PREFIX+"/api/video/allvideos") 
            .then(function (response) {
                setAllVideos(response.data)   
              })
              .catch(function (error) {
                console.log(error);
              })             
            
        }
        fetchData()                       
    },[props])
    document.title = "Not YouTube"
    return (
        <div className="recommendedVideos">
            {allVideos.length === 0 && <h2>Server starting. Please refresh page in 5 seconds.</h2>}
            <div className="recommendedVideos_videosContainer">
                {allVideos.map((videoObject)=>
                    <div key={videoObject._id}  className="recommendedVideos_videos">
                        <Link to={{pathname:"/watch/"+videoObject._id , state:{videoObject}}}>
                            <VideoCard type="videoCard" video={videoObject.video} authorId={videoObject.authorId}/>
                        </Link>
                    </div>
                )}
                {allVideos.map((videoObject)=>
                    <div key={videoObject._id}  className="recommendedVideos_videos">
                        <Link to={{pathname:"/watch/"+videoObject._id , state:{videoObject}}}>
                            <VideoCard type="videoCard" video={videoObject.video} authorId={videoObject.authorId}/>
                        </Link>
                    </div>
                )}
                {allVideos.map((videoObject)=>
                    <div key={videoObject._id}  className="recommendedVideos_videos">
                        <Link to={{pathname:"/watch/"+videoObject._id , state:{videoObject}}}>
                            <VideoCard type="videoCard" video={videoObject.video} authorId={videoObject.authorId}/>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecomendedVideos
