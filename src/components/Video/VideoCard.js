import React from 'react'
import './VideoCard.css'
import Avatar from '@material-ui/core/Avatar'

function VideoCard({id, title, author, authorImg, views, thumbnail, date}) {
    //let videoId = id;
    return (
        <div>
            {/* <video className="videoCard__thumbnail" controls src="{thumbnail}"></video> */}

            <img className="videoCard__thumbnail" src="https://i.ytimg.com/vi/duJNVv9m2NY/maxresdefault.jpg"></img>

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
