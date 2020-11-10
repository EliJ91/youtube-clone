import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import CommentCard from '../CommentCard/CommentCard'
import SortIcon from '@material-ui/icons/Sort';
import {useSelector} from 'react-redux';
import './CommentSection.scss'




function CommentSection(props) {
    const [comment, setComment]=useState("")
    const [allComments, setAllComments]=useState(props.data.comments)
    const [commentButton,setCommentButton]=useState(false)
    const [sortByDate,setSortByDate]=useState(true)

    
    
    
    const user = useSelector(state=>state)
 
    const comments = sortByDate ? allComments.sort((a, b) =>{return new Date(b.date) - new Date(a.date)}) : allComments.sort((a, b) => (a.likes.length > b.likes.length) ? -1 : 1)




    useEffect(()=>{
       async function fetchData(id){
           await axios.get(process.env.REACT_APP_API_PREFIX+"/api/video/getVideo",{params:{movieId: id}}) 
                .then(function (response){
                    setAllComments(response.data[0].comments)
                })
                .catch(function (error) {
                    console.log(error);
                })             
        }
        if(props.data._id){fetchData(props.data._id)}                     
    },[props.data._id])

   async function addComment(id){
      await axios.post(process.env.REACT_APP_API_PREFIX+"/api/video/addComment",{
            movieId: id,
            comment: comment,
            userId: user._id
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
        <div className="commentSection">
            <div className="commentSection_commentHeader"> 
                {comments.length} COMMENTS 
                <div className="commentSection_sortByContainer">
                    <SortIcon  className="commentSection_sortIcon"/> SORT BY 
                    <div className="commentSection_sortBySelectors">
                        <h1 className={`${!sortByDate && "active"}`} onClick={()=>setSortByDate(false)} >Top Comments</h1>
                        <h1 className={`${sortByDate && "active"}`} onClick={()=>setSortByDate(true)}>Newest First</h1>
                    </div>
                    
                </div>
            </div>
            <div className="commentSection_newComment">
                <Avatar src={user.avatar}/>
                <input placeholder="Add a public comment..." value={comment} onClick={()=>setCommentButton(true)} onChange={(e)=>setComment(e.target.value)}/>
                <div className={`commentSection_newCommentButton ${!commentButton && 'hidden'}`}>
                    <button className="commentSection_cancelComment" onClick={()=>setCommentButton(false)}>Cancel</button>
                    <button disabled = {!comment} onClick={()=>{addComment(props.data._id)}
                    } className={`commentSection_submitComment ${!comment && 'disabled'}`}>Comment</button>
                </div>
            </div>

            
                {allComments.length > 0 &&  
                    <div key={comments}>
                        {comments.map((mainComment)=> 
                            <div className="commentSection_Comment" key={mainComment.commentId}>
                                <CommentCard addReply={i => setAllComments(i)} commentData={mainComment}/>
                            </div>
                        )}
                    </div>
                }
                
            
        </div>
    )
}

export default CommentSection

