import React from 'react'
import './VideoCard.css'
import Avatar from '@material-ui/core/Avatar'

function VideoCard({id, title, author, authorImg, views, thumbnail, date}) {
    //let videoId = id;
    return (
        <div>
            {/* <video className="videoCard__thumbnail" controls src="{thumbnail}"></video> */}

            <video src="https://drive.google.com/u/0/vt?authuser=0&id=0B7DRRtZ2o-RsMHh5WU5RbTVpSTA&s=AMedNnoAAAAAX4TO73H_y0jCwSHKYoXgQo_G78hE2co6" controls>
                <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.webm">link to the video</a> instead.</p> 
            </video>

            <div className="videoCard__videoDataContainer">    
                <Avatar className="videoCard__avatar"src={authorImg}/>
            <div className="videoCard__videoData">
                <h1>{title}</h1>
                <h2>{author}</h2>
                <div className="videoCard__videoStats">
                    <h2>{views} views •&nbsp;</h2>
                    <h2> {date}</h2>
                </div>                
            </div>
            

            </div>
        </div>
    )
}

export default VideoCard
