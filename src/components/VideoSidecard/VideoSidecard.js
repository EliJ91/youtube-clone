import React from 'react'
import './VideoSidecard.scss'

function VideoSidecard({id, title, author, authorImg, views, thumbnail, date}) {
    var today = new Date().getTime()
    var posted = new Date(date).getTime()
    var res = Math.abs(today - posted) / 1000;
    var days = Math.ceil(res / 86400);
    var hours = Math.ceil(res / 3600);

    var unit = "hour";

    function checkValues(days, hours){
        if(hours>=24){
            unit = "day"
            return days
        }
        return hours
    }

    let leDays = checkValues(days, hours)

    if(leDays>1){
        var plural = true;
    }

    return (
        <div className="videoSidecard">
            <div className="videoSidecard_thumbnailContainer">
                <img className="videoSidecard_thumbnail" src={thumbnail} alt="video thumbnail"/>
            </div>
            <div className="videoSidecard_videoDataContainer">    
                <div className="videoSidecard_videoData">
                    <h1>{title}</h1>
                    <div className="videoSidecard_dataText">
                        <h1>{author}</h1>
                        <h2>{views} views </h2>
                        <h2> {leDays} {unit}{plural && "s"} ago</h2>   
                    </div>                                 
                </div>
            </div>
        </div>
    )
}

export default VideoSidecard
