import React, {useEffect,useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import {LOGGED_IN} from '../../redux/actions'


const useVideoPageLogic = (movieID) =>{
    const dispatch = useDispatch()
    const movieId = movieID
    const moviePlaceholder = {
        authorId:null,
        comments: [],
        video:{
            description: "",
            dislikes: [],
            genre: "",
            likes: [],
            thumbnail: "",
            title: "",
            uploadDate: "Fri Oct 23 2020 15:39:59 GMT-0400 (Eastern Daylight Time)",
            videoURL: "",
            views: 0
        },
        _id: ""
    }
    const [movie,setMovie]=useState(moviePlaceholder)
    const [author, setAuthor]=useState({subscribers:[]})

    useEffect(()=>{
        async function fetchData(){
            await axios.get(process.env.REACT_APP_API_PREFIX+"/api/video/getVideo",{
                params:{
                    movieId: movieID
                }
            }) 
            .then(function (response) {
                    setMovie(response.data[0])
                    setAuthor(response.data[1])
                })
                .catch(function (error) {
                console.log(error);
                })   
        }
        axios.get(process.env.REACT_APP_API_PREFIX+"/api/video/addView",{params:{movieId: movieID}}) 
            
        fetchData()                       
    },[movieID]) 

   
                     
        const video = movie.video
        const user = useSelector(state => state)
        document.title = video.title

        var date = new Date(video.uploadDate) 
        var MMM = date.toLocaleString('default', { month: 'short' })
        var dd = date.getDate()
        var yyyy = date.getFullYear()

   async function likeVideo(){
      await axios.post(process.env.REACT_APP_API_PREFIX+"/api/video/likeVideo",{userId:user._id,movieId:movieId},{withCredentials:true}) 
            .then(function (response) {
                setMovie(response.data)
              })
              .catch(function (error) {
                console.log(error);
              }) 
    }

    async function dislikeVideo(){
        await axios.post(process.env.REACT_APP_API_PREFIX+"/api/video/dislikeVideo",{userId:user._id,movieId:movieId},{withCredentials:true}) 
              .then(function (response) {
                  setMovie(response.data)
                })
                .catch(function (error) {
                  console.log(error);
                }) 
    }

    async function subscribe(){
        await axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/subscribe",{userId:user._id,authorId:author.userId},{withCredentials:true}) 
              .then(function (response) {
                  setAuthor(response.data[1])
                  dispatch(LOGGED_IN(response.data[0]))
                })
                .catch(function (error) {
                  console.log(error);
                }) 
    }

    return {movie,author,video,user,MMM,dd,yyyy,likeVideo,dislikeVideo,subscribe}
}

export default useVideoPageLogic;