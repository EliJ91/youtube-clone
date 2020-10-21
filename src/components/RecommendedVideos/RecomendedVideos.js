import React, {useEffect, useState} from 'react'
import './RecommendedVideos.css'
import VideoCard from '../Video/VideoCard'
import axios from 'axios'



function RecomendedVideos() {
    const [allVideos, setAllVideos]=useState([])
    
    
              
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(process.env.REACT_APP_API_PREFIX+"/api/video/allvideos")  
            setAllVideos(request.data)     
        }
        fetchData()                       
    },[])


    return (
        <div className="recommendedVideos">
            <h2>Recomended</h2>
        <div className="recommendedVideos__videosContainer">
            {allVideos.map((v)=>
            <div className="recommendedVideos__videos">
                <VideoCard title= {v.title} author={v.username} views={v.views} authorImg={v.userAvatar} thumbnail={v.thumbnail} date={v.uploadDate}/>
            </div>
            )}
        </div>

            {/* <video className="video" 
            controls preload="auto" 
            poster="https://lh6.googleusercontent.com/proxy/b2bX46nG0Xrb7zmSjz8bK2o9TfDem6yYDTMQH8-7yN2FFbSHooKBS1zbORhsgJJzkv_s7bd825ThIxsu2YDKbXBD76SOiR-A=s0-d">
            <source src="https://youtube-clone-storage-ej.s3.amazonaws.com/e8eae8bb-000d-43a5-9c07-18e4eb33e797.mp4" type='video/mp4' />            
            </video> */}
        </div>
    )
}

export default RecomendedVideos
