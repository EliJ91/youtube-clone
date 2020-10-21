import React, { useState} from 'react'
import './LoginUi.scss'
import axios from 'axios'

import {useDispatch} from 'react-redux'
import {LOGGED_IN} from '../../../redux/actions'

// const axios = Axios.create({
//   withCredentials: true
// })




 
function LoginUi(props) {
  const dispatch= useDispatch()

  const [username, setUsername] =useState("")
  const [password, setPassword] =useState("")
  const [password2, setPassword2] =useState("")
  const [avatarImg, setAvatarImg] =useState("")

  const [createAccount, setCreateAccount]=useState(false)
  const [accountCreated, setAccountCreated]=useState(false)

  //================================================CREATE ACCOUNT=============================//
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
        setCreateAccount(false)
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
//==============================================LOG IN========================================//
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
    })
    .then(function (response) {
      console.log(response.status)
      if(response.status === 201){
        dispatch(LOGGED_IN(response.data))
        props.willClose(false)
        console.log(response)
      }
    }) 
    .catch(function (error) {
      if(error.response.status === 401){alert("Password is incorrect.")}
      if(error.response.status === 422){alert("Username does not exist.")}
      console.log(error);
    })
  }

 

  return (
    <div className="loginUi__alertContainer">
     {accountCreated ? <div className="loginUi__alert"> ACCOUNT CREATED </div >:<div></div>}

      <div className="loginUi__container">

        
          <input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text"placeholder="Username"/>

          {!createAccount ?
          <p className="loginUi__textLink" onClick={()=>setCreateAccount(true)} >Need an account?</p>:
          <p className="loginUi__textLink" onClick={()=>setCreateAccount(false)}>Already have an account?</p>}
          
        

        
          <input className="" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
        
        
        {!createAccount  ? <div></div> : <input type="password" value={password2}  onChange={(e)=>setPassword2(e.target.value)} placeholder="Re-type password"/>}
        {!createAccount  ? <div></div> : <input type="text" value={avatarImg}  onChange={(e)=>setAvatarImg(e.target.value)} placeholder="Avatar URL"/>}
        {!createAccount ?
        <button onClick={()=>login(username,password)} className="loginUi__button">Login</button>:
        <button onClick={()=>newAccount(username,password,password2,avatarImg)} className="loginUi__button create">Create Account</button> }
        
      </div>
    </div>
    
  )
}

export default LoginUi;


