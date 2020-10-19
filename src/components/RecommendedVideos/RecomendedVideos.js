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

            <video 
            controls preload="auto" width="640" height="480"
            poster="https://lh6.googleusercontent.com/proxy/b2bX46nG0Xrb7zmSjz8bK2o9TfDem6yYDTMQH8-7yN2FFbSHooKBS1zbORhsgJJzkv_s7bd825ThIxsu2YDKbXBD76SOiR-A=s0-d">

            <source src="https://youtube-clone-storage-ej.s3.amazonaws.com/fc19d141-79a6-421a-a874-3da8a490a73d.mp4" type='video/mp4' />
            
            </video>
            
        </div>
    )
}

export default RecomendedVideos
