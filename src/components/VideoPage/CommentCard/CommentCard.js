import React, {useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './CommentCard.scss'



function CommentCard(props) {
    const[hidden, setHidden]=useState(true)
    
    let comment = props.commentData
    
    
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




    return (
        <>
        <div className={`commentCard ${props.nestReply && "nest"}`}>
            <Avatar className={`avatar ${props.nestReply && "nest"}`} src={comment.userAvatar}/>
            <div className="textContainer">
                <div className="authorInfo">{comment.username} {leDays} {unit}{leDays > 1 ? "s" :""} ago</div>
                <div className="comment">{comment.comment}</div>
                    <div className="likeDislikesContainer">
                        <ThumbDownAltIcon className="likeIcon" />{comment.likes.length}
                        <ThumbUpAltIcon className="likeIcon"/>{comment.dislikes.length}
                        <span>Reply</span>
                    </div>
                        {comment.reply && 
                        <>
                            <h1 onClick={()=>{setHidden(!hidden)}}> {hidden ? <><ArrowDropDownIcon/> View</> : <><ArrowDropUpIcon/> Hide</>}  {comment.reply.length} {comment.reply.length > 1 ? "replies" :"reply"}</h1>
                            <div className={`replyContainer ${hidden && "hide"}`}>
                            {comment.reply.map((c)=><CommentCard nestReply commentData={c}/>)}
                            </div>
                        </>
                        }
                </div>            
        </div>
        
        </>
    )
}

export default CommentCard;
