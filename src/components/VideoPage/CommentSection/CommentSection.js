import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import CommentCard from '../CommentCard/CommentCard'
import SortIcon from '@material-ui/icons/Sort';
import {useSelector} from 'react-redux';

const Axios = axios;

function CommentSection(props) {
    const [comment, setComment]=useState()
    const [allComments, setAllComments]=useState({})
    const [commentButton,setCommentbutton]=useState(false)
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
        }) 
            .then(function (response) {
                console.log(response.data.comments)
                setAllComments(response.data.comments)  
                })
                .catch(function (error) {
                    console.log(error);
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
                <input placeholder="Add a public comment..." onClick={()=>setCommentbutton(true)} onChange={(e)=>setComment(e.target.value)}/>
                <div className={`videoPage_newCommentButton ${!commentButton && 'hidden'}`}>
                    <button className="videoPage_cancelComment" onClick={()=>setCommentbutton(false)}>Cancel</button>
                    <button disabled = {!comment} onClick={()=>{addComment(props.data._id)}
                    } className={`videoPage_submitComment ${!comment && 'disabled'}`}>Comment</button>
                </div>
            </div>

            
                {allComments.length > 0 &&  
                    <div >
                        {allComments.map((comment)=> 
                            <div >
                                <CommentCard key={comment} commentData={comment}/>
                                {!comment.reply && comment.reply.map((reply)=>
                                    <CommentCard key={comment} commentData={reply}/>)
                                }
                            </div>
                        )}
                    </div>
                }
                
            
        </div>
    )
}

export default CommentSection

