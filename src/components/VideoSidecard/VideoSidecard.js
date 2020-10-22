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
            <div className="videoCard__thumbnailContainer">
                <img className="videoCard__thumbnail" src={thumbnail} alt="video thumbnail"/>
            </div>
            

            <div className="videoCard__videoDataContainer">    
                <div className="videoCard__videoData">
                    <h1>{title}</h1>
                    <h2>{author}</h2>
                <div className="videoCard__videoStats">
                    <h2>{views} views •&nbsp;</h2>
                    <h2> {leDays} {unit}{plural && "s"} ago</h2>
                </div>                
            </div>
            

            </div>
        </div>
    )
}

export default VideoSidecard
