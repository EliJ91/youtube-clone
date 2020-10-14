import React, {useCallback, useState} from 'react'
import './Dropzone.css'
import {useDropzone} from 'react-dropzone'
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios'




 
function MyDropzone() {

  const [movie, setMovie] = useState()
  const [AUTH_TOKEN, setAUTH_TOKEN]=useState()
  const onDrop = useCallback(acceptedFiles => {
    setMovie(acceptedFiles)
    let API_AUTH_TOKEN = ""
    axios.post('https://sandbox.api.video/auth/api-key', {
      apiKey: "SkGQnAbt0xEwWBiglfTPtITEMQYY7fUZ8bQ95mfHKz"
      })
      .then(function (response) {
          setAUTH_TOKEN(response.data.access_token)
          console.log(AUTH_TOKEN)
      })
      .catch(function (error) {
          console.log(error);
          console.log('ERROR')
      })
      
    console.log(acceptedFiles)
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
 
function logMovie(e){
  e.preventDefault()
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
        <p className="mydropzone__inputTitle">Title</p><input className="mydropzone__input" type="text"/>
      </div>
      <div className="mydropzone__inputContainer">
        <p className="mydropzone__inputTitle" >Description</p><textarea rows="5" className="mydropzone__input mydropzone__description" type="text"/>
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