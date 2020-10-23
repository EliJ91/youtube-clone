import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import './VideoSidebar.css'
import VideoSidecard from '../VideoSidecard/VideoSidecard'
import axios from 'axios'
import Switch from '@material-ui/core/Switch';



function VideoSidebar() {
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

const [button,setButton]=useState(true)
    return (
        <div className="videoSideBar">
            <h2>Up Next</h2>
            <Switch
            checked={button}
            onChange={(e)=>{setButton(!button)}}
            style={{color:"blue"}}
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}/>
            <div className="videoSideBar__videosContainer">
                {allVideos.map((v)=>
                <div onClick={()=>directToVideo(v)} className="videoSideBar__videos">
                    <VideoSidecard  title= {v.title} author={v.username} views={v.views} authorImg={v.userAvatar} thumbnail={v.thumbnail} date={v.uploadDate}/>
                </div>
                )}
            </div>

            
        </div>
    )
}

export default VideoSidebar
