import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import './CommentCard.scss'



function CommentCard(props) {
    let comment= props.commentData
    
    var today = new Date().getTime()
    var posted = new Date(comment.date).getTime()
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
    <div className="commentCard">
        <Avatar src={comment.userAvatar}/>
        <div className="textContainer">
            <div className="authorInfo">{comment.username} {leDays} {unit}{plural && "s"} ago</div>
            <div className="comment">{comment.comment}</div>
                <div className="likeDislikesContainer">
                    <ThumbDownAltIcon className="likeIcon" />{comment.likes.length}
                    <ThumbUpAltIcon className="likeIcon"/>{comment.dislikes.length}
                    <span>Reply</span>
                </div>
            </div>
    </div>
    )
}

export default CommentCard
