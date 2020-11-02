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

  const [loading, setLoading]=useState(false)
  

  const userId = useSelector(state=>state._id)
  const userAvatar = useSelector(state=>state.avatar)
  const userName = useSelector(state=>state.username)
  const subscribers = useSelector(state=>state.subscribers)

  const [uploaded, setUploaded]=useState(false)

  const [movie, setMovie] = useState({}) 
  

  function prepareFile(e){
    e.preventDefault()
   }

 function loadDroppedFile(e){
   if(e.dataTransfer.files[0].size > 104857600){
    e.stopPropagation()
    e.preventDefault()
    setMovie({})
    alert("Movie must be less than 100MB")
    return
   }
  e.stopPropagation()
  e.preventDefault()
  setMovie(e.dataTransfer.files[0])   
 }

 function loadSelectedFile(e){
  if(e.target.files[0].size > 104857600){
    e.stopPropagation()
    e.preventDefault()
    setMovie({})
    alert("Movie must be less than 100MB")
    return
  }
  e.stopPropagation()
  e.preventDefault()
  setMovie(e.target.files[0])   
 }

console.log(movie.size)


async function uploadMovie(event){
  setLoading(true)
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
  formData.append('subscribers', subscribers)
  
  
  

  try{
    const res = await axios.post(process.env.REACT_APP_API_PREFIX+"/api/video/upload", formData,{withCredentials: true})
    console.log(res)
    if(res.status === 200){
      setUploaded(true)
      console.log(res.data)
      props.willClose(false)
      return <Redirect to='/'  />  
    }
  }catch(error){
    console.log(error)
    if(error){
      alert("Please log in.")
    }
    setLoading(false)
    console.log(error)
  }
  
}

  return (
    <div className="mydropzone_container">
      <div className="mydropzone_dropzoneContainer" name="video"  onDragOver={(e)=>prepareFile(e)} onDrop={loadDroppedFile}>
        {movie.name ?
           <PublishIcon className="mydropzone_publishIcon" />:<div className="mydropzone_dropzone">Click or Drop the file here ...</div>
        }
      </div>  

      <input className="mydropzone_inputFile" type="file"  id="fileInput"  onChange={loadSelectedFile}/>
      <label className="mydropzone_inputFileLabel" htmlFor="fileInput">
        {movie.name ? movie.name : "Click to select file. File must be under 100MB." }</label>


      <div className="mydropzone_inputContainer">
        <p className="mydropzone_inputTitle">Title</p><input onChange={(e)=>{setVideoTitle(e.target.value)}} className="mydropzone_input" type="text"/>
      </div>
      <div className="mydropzone_inputContainer">
        <p className="mydropzone_inputTitle" >Description</p><textarea name="description" onChange={(e)=>{setVideoDescription(e.target.value)}} rows="3" className="mydropzone_input mydropzone_description" type="text"/>
      </div>
      <div className="mydropzone_inputContainer flex">
        <>
          <p className="mydropzone_inputTitle">Genre</p>
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
          <p className="mydropzone_inputTitle">Thumbnail URL</p>
          <input className="mydropzone_input" onChange={(e)=>setVideoThumbnail(e.target.value)}type="select"/>
        </>
      </div>
      {uploaded ? 
      <button className="mydropzone_button uploaded">Uploaded</button> : 
      <button onClick={uploadMovie} className="mydropzone_button">{!loading ? "Upload":"Loading..."}</button> }
      
    </div>
    
  )
}

export default MyDropzone;


// {
//   isDragActive ?
//     <><div className="mydropzone_dropzone">Drop the file here ...</div> 
//     <div className="mydropzone_selectUpload">Select File</div></>:
//     <><div className="mydropzone_dropzone">Drop the file here ...</div> 
//     <button className="mydropzone_selectUpload">Select File</button></>
// }