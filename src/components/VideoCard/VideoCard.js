import React from 'react'
import './VideoCard.scss'
import Avatar from '@material-ui/core/Avatar'

function VideoCard({id, title, author, authorImg, views, thumbnail, date}) {
    var today = new Date().getTime()
    var posted = new Date(date).getTime()
    var res = Math.abs(today - posted) / 1000;
    var days = Math.ceil(res / 86400);
    var hours = Math.ceil(res / 3600);

    var unit = "hour";

    function checkValues(days, hours){
        if(hours>=24){
            unit = "days"
            return days
        }
        return hours
    }

    let leDays = checkValues(days, hours)

    if(leDays>1){
        var plural = true;
    }

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
                        <h2> {leDays} {unit}{plural && "s"} ago</h2>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default VideoCard
