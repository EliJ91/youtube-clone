import React from 'react'
import './VideoCard.scss'
import Avatar from '@material-ui/core/Avatar'
import timeSince from '../../Utils/timeSince'

function VideoCard({id, title, author, authorImg, views, thumbnail, date}) {
       
    const time = timeSince(date)
    
    return (
        <div className="videoCard">
            <div className="videoCard_thumbnailContainer">
                <img className="videoCard_thumbnail" src={thumbnail} alt="video thumbnail"/>
            </div>
            

            <div className="videoCard_videoDataContainer">    
                <Avatar className="videoCard_avatar"src={authorImg}/>
                <div className="videoCard_videoData">
                    <h1>{title}</h1>
                    <h2>{author}</h2>
                    <div className="videoCard_videoStats">
                        <h2>{views} views •&nbsp;</h2>
                        <h2> {time.time} {time.unit}{time.time > 1 ? "s" :""} ago</h2>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default VideoCard
