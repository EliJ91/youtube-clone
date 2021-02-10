
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {useState} from 'react'
import {LOGGED_IN} from '../../redux/actions'

const useLoginInterface = (toggle) => {
  const dispatch= useDispatch()

  const [username, setUsername] =useState("")
  const [password, setPassword] =useState("")
  const [password2, setPassword2] =useState("")
  const [avatarImg, setAvatarImg] =useState("")
  const [createNew, setCreateNew] = useState(false)

  const [accountCreated, setAccountCreated]=useState(false)

  function newAccount(username, password, password2, avatar){
    if(username === "" ){
      alert("username cannot be blank")
      return
    }
    if(password !== password2){
      alert("Passwords do not match")
      return
    }
    if(password === "" ){
      alert("Passwords cannot be blank")
      return
    }
    axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/create",
    {
      username,
      password,
      avatar
    })
    .then(function (response) {
      if(response.status === 201){
        setAccountCreated(true) 
        setCreateNew(false)
        setUsername("")
        setPassword("")
        setPassword2("")
        
      }
      console.log(response);
    }) 
    .catch(function (error) {
      if(error.response.status === 422){alert("Username already in use.")}
      console.log(error);
    });
  }

  //==============================================================================================================================//
  function login(username, password){
      if(password === ""){
        alert("Password cannot be blank")
        return
      }
      if(username === ""){
        alert("Username cannot be blank")
        return
      }
      
      axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/login",
      {
        username,
        password
      },{withCredentials: true})
      .then(function (response) {
        console.log(response)
        if(response.status === 201){
          dispatch(LOGGED_IN(response.data))
          toggle(false)
        }
      }) 
      .catch(function (error) {
        if(error.response.status === 401){alert("Password is incorrect.")}
        if(error.response.status === 422){alert("Username does not exist.")}
        console.log(error);
      })
      console.log()
    }

    return {username,setUsername,password,setPassword,password2,setPassword2,avatarImg,setAvatarImg,createNew,setCreateNew,login,newAccount}
}


export default useLoginInterface;