import React from 'react'
import './RecommendedVideos.css'
import VideoCard from '../Video/VideoCard'
import AvatarImg from '../Header/img/avatar.jpg'




function RecomendedVideos() {
    return (
        <div className="recommendedVideos">
            <h2>Recomended</h2>
            <div className="recommendedVideos__videos">
                <VideoCard title= "YouTube Clone" id = "0" author="Eli Jernigan" views= "489" authorImg={AvatarImg} thumbnail="https://drive.google.com/file/d/0B7DRRtZ2o-RsMHh5WU5RbTVpSTA/preview" date="2 days"/>
            </div>
            
        </div>
    )
}

export default RecomendedVideos
