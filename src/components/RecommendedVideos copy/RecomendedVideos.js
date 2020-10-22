import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import './RecommendedVideos.css'
import VideoCard from '../VideoCard/VideoCard'
import axios from 'axios'



function RecomendedVideos() {
    const [allVideos, setAllVideos]=useState([])
    let history = useHistory()
    
    
              
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

    function directToVideo(v){
        
        history.push({
            pathname: "/watch",
            state: { 
                v
        }})
    }


    return (
        <div className="recommendedVideos">
            <h2>Recomended</h2>
        <div className="recommendedVideos__videosContainer">
            {allVideos.map((v)=>
            <div onClick={()=>directToVideo(v)} className="recommendedVideos__videos">
                <VideoCard  title= {v.title} author={v.username} views={v.views} authorImg={v.userAvatar} thumbnail={v.thumbnail} date={v.uploadDate}/>
            </div>
            )}
        </div>

            
        </div>
    )
}

export default RecomendedVideos
