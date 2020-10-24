import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './RecommendedVideos.css'
import VideoCard from '../VideoCard/VideoCard'
import axios from 'axios'



function RecomendedVideos() {
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
        <div className="recommendedVideos">
            <h2>Recomended</h2>
            <div className="recommendedVideos__videosContainer">
                {allVideos.map((videoObject)=>
                    <div key={videoObject._id}  className="recommendedVideos__videos">
                        <Link to={{pathname:"/watch/"+videoObject._id , state:{videoObject}}}>
                            <VideoCard  title= {videoObject.video.title} author={videoObject.author.username} views={videoObject.video.views} authorImg={videoObject.author.userAvatar} thumbnail={videoObject.video.thumbnail} date={videoObject.video.uploadDate}/>
                        </Link>
                    </div>
                
                )}
            </div>
        </div>
    )
}

export default RecomendedVideos
