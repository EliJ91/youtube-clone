import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import './CommentCard.scss'
import timeSince from '../../../Utils/timeSince'
import axios from 'axios'
import {useSelector} from 'react-redux';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';




function CommentCard(props) {
    const [reply, setReply]=useState("")
    const user = useSelector(state=>state)
    const [replyButton,setReplyButton]=useState(false)
    const comment = props.commentData
    const [hidden, setHidden]=useState(true)

    const time = timeSince(comment.date)
    
    async function replyComment(commentt){
        await axios.post(process.env.REACT_APP_API_PREFIX+"/api/video/replyComment",{
            replyId: commentt.commentId ? commentt.commentId : commentt.replyId ,
            comment: reply,
            user: user
        },{withCredentials: true}) 
            .then(function (response) {
                props.addReply(response.data) 
                setReplyButton(false)
                setReply("")
                })
                .catch(function (error) {
                    console.log(error)
                    alert("Please log in.")
                      
                }) 
    }
    return (
        <>
        <div key={comment} className={`commentCard ${props.nestReply && "commentCard_nest"}`}>
            <Avatar className={`commentCard_avatar ${props.nestReply && "commentCard_nest"}`} src={comment.userAvatar}/>
            <div className="commentCard_textContainer">
                <div className="commentCard_authorInfo">{comment.username} {time.time} {time.unit}{time.time > 1 ? "s" :""} ago</div>
                <div className="commentCard_comment">{comment.comment}</div>
                    <div className="commentCard_likeDislikesContainer">
                        <ThumbDownAltIcon className="commentCard_likeIcon" />{comment.likes.length}
                        <ThumbUpAltIcon className="commentCard_likeIcon"/>{comment.dislikes.length}
                        <span onClick={()=>setReplyButton(true)}>Reply</span>
                    </div>
                    <div className={`commentCard_newComment ${!replyButton && 'hidden'}`}>
                        <Avatar className="commentCard_replyAvatar" src={user.avatar}/>
                        <input placeholder="Add a public comment..."  value={reply} onChange={(e)=>setReply(e.target.value)}/>
                        <div className="commentCard_newCommentButton">
                            <button className="commentCard_cancelComment" onClick={()=>setReplyButton(false)}>Cancel</button>
                            <button disabled = {!reply} onClick={()=>{replyComment(comment)}} className={`commentCard_submitComment ${!reply && 'disabled'}`}>Reply</button>
                        </div>
                    </div>
                        
            </div>                 
        </div>
        {comment.reply && 
                <>
                    {comment.reply.length > 0 && 
                        <h1 onClick={()=>{setHidden(!hidden)}}> 
                            {hidden ? <><ArrowDropDownIcon/> View</> : <><ArrowDropUpIcon/> Hide</>} {comment.reply.length} {comment.reply.length > 1 ? "replies" :"reply"}
                        </h1>
                    }
        
                    <div className={`commentCard_replyContainer ${hidden && "commentCard_hide"}`}>
                        {comment.reply.map((c)=><CommentCard nestReply addReply={props.addReply} key={c.replyId} commentData={c}/>)}
                    </div>
                </>
            }
        </>
    )
}

export default CommentCard;
