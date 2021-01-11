
import axios from 'axios'
import {useDispatch} from 'react-redux'


export function createAccount(username, password, password2, avatar){
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
        return true        
      }
      console.log(response);
    }) 
    .catch(function (error) {
      if(error.response.status === 422){alert("Username already in use.")}
      console.log(error);
    });
  }

  //==============================================================================================================================//
export function login(username, password){
    if(password === ""){
        return "Password cannot be blank"
    }
    if(username === ""){
      return "Username cannot be blank"
    }
    
    axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/login",
    {
      username,
      password
    },{withCredentials: true})
    .then(function (response) {
      if(response.status === 201){
          let data = response.data
        //dispatch(LOGGED_IN(response.data))
        console.log(data)
        return data
      }
    }) 
    .catch(function (error) {
      if(error.response.status === 401){return 401}
      if(error.response.status === 422){return 422}
      console.log(error);
    })
  }