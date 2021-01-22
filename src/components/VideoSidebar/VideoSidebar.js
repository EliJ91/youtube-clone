import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './VideoSidebar.scss'
import axios from 'axios'
import VideoCard from '../VideoCard/VideoCard'



function VideoSidebar() {
    const [allVideos, setAllVideos]=useState([])

    useEffect(()=>{
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
    },[])
    return (
        <div className="videoSideBar">
            <div className="videoSideBar_videosContainer">
                {allVideos.map((videoObject)=>
                <Link key={videoObject._id} to={{pathname: "/watch/"+videoObject._id, state: {videoObject}}}>
                    <div key={videoObject._id} className="videoSideBar_videos">
                        <VideoCard  type="videoSidecard" video={videoObject.video} authorId={videoObject.authorId} />
                    </div>
                </Link>
                )}
            </div>

            
        </div>
    )
}

export default VideoSidebar
