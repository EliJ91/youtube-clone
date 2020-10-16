import React, {useCallback, useState} from 'react'
import './Dropzone.css'
import {useDropzone} from 'react-dropzone'
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios'




 
function MyDropzone() {

  const [movie, setMovie] = useState() 
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")


 const onDrop = useCallback(acceptedFiles => {
    setMovie(acceptedFiles)
    console.log(acceptedFiles)
    
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
 
function logMovie(e){
  e.preventDefault()
  axios.post("http://localhost:5000/api/video/upload", {movie,title,description})
  console.log(movie)
}

  return (
    <div className="mydropzone__container">
      <div className="mydropzone__dropzoneContainer" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive || movie ?
            <PublishIcon className="mydropzone__publishIcon" />:<div className="mydropzone__dropzone">Click or Drop the file here ...</div>
        }
      </div>
      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle">Title</p><input onChange={(e)=>setTitle(e.target.value)} className="mydropzone__input" type="text"/>
      </div>
      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle" >Description</p><textarea onChange={(e)=>setDescription(e.target.value)} rows="5" className="mydropzone__input mydropzone__description" type="text"/>
      </div>
      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle">Hashtags <span>(Separate by commas)</span></p><input className="mydropzone__input" type="text"/>
      </div>
      <button onClick={(e)=>(logMovie(e))} className="mydropzone__button">Upload</button>
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