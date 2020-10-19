import React, { useState} from 'react'
import './Dropzone.scss'
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios'




 
function MyDropzone() {

  const [videoTitle, setVideoTitle] =useState("")
  const [videoDescription, setVideoDescription] =useState("")
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
  formData.append('description', videoDescription)
  
  
  

  try{
    const res = await axios.post("http://localhost:5000/api/video/upload", formData)
    console.log(res)
    if(res.status === 200){
      setUploaded(true)
    }
  }catch(error){
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
        <p className="mydropzone__inputTitle" >Description</p><textarea name="description" onChange={(e)=>{setVideoDescription(e.target.value)}} rows="5" className="mydropzone__input mydropzone__description" type="text"/>
      </div>
      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle">Hashtags <span>(Separate by commas)</span></p><input className="mydropzone__input" type="text"/>
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