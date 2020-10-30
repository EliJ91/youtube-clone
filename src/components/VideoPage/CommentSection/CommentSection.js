import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import CommentCard from '../CommentCard/CommentCard'
import SortIcon from '@material-ui/icons/Sort';
import {useSelector} from 'react-redux';

const Axios = axios;

function CommentSection(props) {
    const [comment, setComment]=useState("")
    const [allComments, setAllComments]=useState({})
    const [commentButton,setCommentButton]=useState(false)
    const user = useSelector(state=>state)
 
 const comments = allComments ? allComments : props.data.comments

    useEffect(()=>{
        function fetchData(){
            Axios.get(process.env.REACT_APP_API_PREFIX+"/api/video/getVideo",{params:{movieId: props.data._id}}) 
                .then(function (response){
                    setAllComments(response.data.video.comments)
                    
                    
                })
                .catch(function (error) {
                    console.log(error);
                })             
            
        }
        fetchData()                       
    },[props.data._id])

    function addComment(id){
        Axios.post(process.env.REACT_APP_API_PREFIX+"/api/video/addComment",{
            movieId: id,
            comment: comment,
            user: user
        },{withCredentials: true}) 
        .then(function (response) {
            setAllComments(response.data.comments)  
            setCommentButton(false)
            setComment("")
        })
        .catch(function (error) {
            if(error){
                alert("Please log in.")
              }
        }) 
    }


    return (
        <div>
            <div className="videoPage_commentHeader"> 
                {comments.length} COMMENTS 
                <p>
                    <SortIcon className="videoPage_sortIcon"/> SORT BY
                </p>
            </div>
            <div className="videoPage_newComment">
                <Avatar src={user.avatar}/>
                <input placeholder="Add a public comment..." value={comment} onClick={()=>setCommentButton(true)} onChange={(e)=>setComment(e.target.value)}/>
                <div className={`videoPage_newCommentButton ${!commentButton && 'hidden'}`}>
                    <button className="videoPage_cancelComment" onClick={()=>setCommentButton(false)}>Cancel</button>
                    <button disabled = {!comment} onClick={()=>{addComment(props.data._id)}
                    } className={`videoPage_submitComment ${!comment && 'disabled'}`}>Comment</button>
                </div>
            </div>

            
                {allComments.length > 0 &&  
                    <div >
                        {allComments.map((mainComment)=> 
                            <div >
                                <CommentCard key={mainComment} commentData={mainComment}/>
                                {!mainComment.reply && mainComment.reply.map((reply)=>
                                    <CommentCard key={reply} commentData={reply}/>)
                                }
                            </div>
                        )}
                    </div>
                }
                
            
        </div>
    )
}

export default CommentSection

