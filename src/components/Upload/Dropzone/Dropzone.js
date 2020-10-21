import React, { useState} from 'react'
import './Dropzone.scss'
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios'
import {useSelector} from 'react-redux';
import  { Redirect } from 'react-router-dom'

 
function MyDropzone(props) {

  const [videoTitle, setVideoTitle] =useState("")
  const [videoDescription, setVideoDescription] =useState("")
  const [videoGenre, setVideoGenre] =useState("Comedy")
  const [videoThumbnail, setVideoThumbnail] =useState("")
  

  const userId = useSelector(state=>state._id)
  const userAvatar = useSelector(state=>state.avatar)
  const userName = useSelector(state=>state.username)

  const [uploaded, setUploaded]=useState(false)

  const [movie, setMovie] = useState({}) 
  

  function prepareFile(e){
    e.stopPropagation()
    e.preventDefault()
    e.persist()
   }

 function loadDroppedFile(e){
  e.stopPropagation()
  e.preventDefault()
  setMovie(e.dataTransfer.files[0])   
 }

 function loadSelectedFile(e){
  e.stopPropagation()
  e.preventDefault()
  setMovie(e.target.files[0])   
 }




async function uploadMovie(event){
  event.preventDefault()
  const formData = new FormData()
  formData.append('file',movie)
  formData.append('title', videoTitle)
  formData.append('thumbnail', videoThumbnail)
  formData.append('description', videoDescription)
  formData.append('genre', videoGenre)
  formData.append('userId', userId)
  formData.append('userAvatar', userAvatar)
  formData.append('username', userName)
  
  
  

  try{
    const res = await axios.post("http://localhost:5000/api/video/upload", formData,{withCredentials: true})
    console.log(res)
    if(res.status === 200){
      setUploaded(true)
      console.log(res.data)
      props.willClose(false)
      return <Redirect to='/'  />  
    }
  }catch(error){
    if(error.response.status === 500){
      alert("Please log in before your upload")
    }
    console.log(error)
  }
  
}

  return (
    <div className="mydropzone__container">
      <div className="mydropzone__dropzoneContainer" name="video" onDragEnter={(e)=>prepareFile(e)} onDragOver={(e)=>prepareFile(e)} onDrop={loadDroppedFile}>
        {movie.name ?
           <PublishIcon className="mydropzone__publishIcon" />:<div className="mydropzone__dropzone">Click or Drop the file here ...</div>
        }
      </div>  

      <input className="mydropzone__inputFile" type="file"  id="fileInput"  onChange={loadSelectedFile}/>
      <label className="mydropzone__inputFileLabel" htmlFor="fileInput">
        {movie.name ? movie.name : "Click to select file." }</label>


      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle">Title</p><input onChange={(e)=>{setVideoTitle(e.target.value)}} className="mydropzone__input" type="text"/>
      </div>
      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle" >Description</p><textarea name="description" onChange={(e)=>{setVideoDescription(e.target.value)}} rows="3" className="mydropzone__input mydropzone__description" type="text"/>
      </div>
      <div className="mydropzone__inputContainer flex">
        <>
          <p className="mydropzone__inputTitle">Genre</p>
          <select onChange={(e)=>setVideoGenre(e.target.value)}>
              <option value="comedy">Comedy</option>
              <option value="cars">Cars</option>
              <option value="games">Games</option>
              <option value="coding">Coding</option>
              <option value="informative">Informative</option>
              <option value="home improvement">Home Improvement</option>
              <option value="sports">Sports</option>
              <option value="health">Health</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="social studies">Social Studies</option>
              <option value="movies">Movies</option>
            </select>
        </>
        <>
          <p className="mydropzone__inputTitle">Thumbnail URL</p>
          <input className="mydropzone__input" onChange={(e)=>setVideoThumbnail(e.target.value)}type="select"/>
        </>
      </div>
      {uploaded ? 
      <button className="mydropzone__button uploaded">Uploaded</button> : 
      <button onClick={uploadMovie} className="mydropzone__button">Upload</button> }
      
    </div>
    
  )
}

export default MyDropzone;


// {
//   isDragActive ?
//     <><div className="mydropzone__dropzone">Drop the file here ...</div> 
//     <div className="mydropzone__selectUpload">Select File</div></>:
//     <><div className="mydropzone__dropzone">Drop the file here ...</div> 
//     <button className="mydropzone__selectUpload">Select File</button></>
// }