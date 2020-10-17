import React, { useState} from 'react'
import './Dropzone.css'
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios'




 
function MyDropzone() {

  var freader = new FileReader()

  const [videoForm, setVideoForm] =useState({
    title:"",
    description:"",
    file:null
  })
  const [movie, setMovie] = useState({}) 
  

  function prepareFile(e){
    e.stopPropagation()
    e.preventDefault()
    e.persist()
   }
 function loadFile(e){
  e.stopPropagation()
  e.preventDefault()
  var dt = e.dataTransfer;
  setVideoForm({
    ...videoForm,
    file : dt.files[0]
    }) 
  // freader.onload=function(){
  //   setMovie(freader.result)
  // }
  // console.log(movie)
  // alert(JSON.stringify(movie))
 }



 function handleChange(event){
   event.stopPropagation()
   event.preventDefault()
   const inputValue = event.target.value
   
   setVideoForm({
     ...videoForm,
     [event.target.name]: inputValue
   })
 }

function logMovie(event){
  event.preventDefault()
  console.log({videoForm})
  axios.post("http://localhost:5000/api/video/upload", {videoForm})
}

  return (
    <div className="mydropzone__container">
      <div className="mydropzone__dropzoneContainer" name="video" onDragEnter={(e)=>prepareFile(e)} onDragOver={(e)=>prepareFile(e)} onDrop={loadFile}>
        {movie ?
            <PublishIcon className="mydropzone__publishIcon" />:<div className="mydropzone__dropzone">Click or Drop the file here ...</div>
        }
      </div>
      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle">Title</p><input name="title" onChange={handleChange} className="mydropzone__input" type="text"/>
      </div>
      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle" >Description</p><textarea name="description" onChange={handleChange} rows="5" className="mydropzone__input mydropzone__description" type="text"/>
      </div>
      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle">Hashtags <span>(Separate by commas)</span></p><input className="mydropzone__input" type="text"/>
      </div>
      <button onClick={logMovie} className="mydropzone__button">Upload</button>
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