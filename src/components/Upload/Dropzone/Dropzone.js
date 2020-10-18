import React, { useState} from 'react'
import './Dropzone.css'
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios'




 
function MyDropzone() {

  const [videoForm, setVideoForm] =useState({
    title:"",
    description:""
  })

  const [movie, setMovie] = useState({}) 
  const [uploadedFile, setUploadedFile]=useState({})
  

  function prepareFile(e){
    e.stopPropagation()
    e.preventDefault()
    e.persist()
   }

 function loadFile(e){
  e.stopPropagation()
  e.preventDefault()
  var dt = e.dataTransfer;
  var vid = dt.files[0]
  setMovie(vid)    
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

async function uploadMovie(event){
  event.preventDefault()
  const formData = new FormData()
  formData.append('file',movie)
  //formData.append('videoForm',videoForm)

  try{
    const res = await axios.post("http://localhost:5000/api/video/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const {fileName, filePath} =res.data
    setUploadedFile({fileName, filePath})
  }catch(error){
    console.log(error)
  }
  //axios.post("http://localhost:5000/api/video/upload", {videoForm})
  console.log(uploadedFile)
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
      <button onClick={uploadMovie} className="mydropzone__button">Upload</button>
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