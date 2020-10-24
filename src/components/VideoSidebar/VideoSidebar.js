import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './VideoSidebar.scss'
import VideoSidecard from '../VideoSidecard/VideoSidecard'
import axios from 'axios'
import Switch from '@material-ui/core/Switch';



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

    

const [button,setButton]=useState(true)
    return (
        <div className="videoSideBar">
            <div className="videoSideBar__topContainer">
                <h2>Up Next</h2>
                <Switch
                checked={button}
                onChange={(e)=>{setButton(!button)}}
                style={{color:"blue"}}
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}/>
            </div>
            <div className="videoSideBar__videosContainer">
                {allVideos.map((videoObject)=>
                <Link to={{pathname: "/watch/"+videoObject._id, state: {videoObject}}}>
                    <div key={videoObject._id} className="videoSideBar__videos">
                        <VideoSidecard  title= {videoObject.video.title} author={videoObject.author.username} views={videoObject.video.views} authorImg={videoObject.author.userAvatar} thumbnail={videoObject.video.thumbnail} date={videoObject.video.uploadDate}/>
                    </div>
                </Link>
                )}
            </div>

            
        </div>
    )
}

export default VideoSidebar
