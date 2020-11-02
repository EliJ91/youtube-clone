import React, {useEffect} from 'react'
import './Header.scss'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'
import VideoCallIcon from '@material-ui/icons/VideoCall'
import AppsIcons from '@material-ui/icons/Apps'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Avatar from '@material-ui/core/Avatar'
import Logo from './img/logo.svg'
import {useState} from 'react';
import Upload from '../Upload/Upload'
import Login from '../Login/Login'
import {useSelector, useDispatch} from 'react-redux';
import {LOGGED_IN} from '../../redux/actions'
import {defaultState} from '../../redux/reducer'
import axios from 'axios'
import {Link} from 'react-router-dom'




function Header() {

    const [uploadVideo, setUploadVideo] = useState(false)
    const [login, setLogin] = useState(false)
    const dispatch = useDispatch()

   
    const loggedIn = useSelector(store=>store.username)
    const avatar = useSelector(store=>store.avatar)

    
    useEffect(()=>{
        async function fetchData(){
            const user = await axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/stayLogged",{}, {withCredentials: true}) 
            if(!user){
                console.log("Not logged in.")
            }
            dispatch(LOGGED_IN(user.data))       
        }
        fetchData()                       
    },[dispatch])

    function logout(e){
        e.preventDefault()
        dispatch(LOGGED_IN(defaultState))
        axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/logout",{},{withCredentials: true})
        
      }

    

    return (
        <>
        <div className="header">

            <div className="header_left">
                <Link to='/' ><img className="header_logo" src={Logo} alt=""/></Link>
            </div>

            <div className="header_input">
                <input placeholder="Search" type="text"></input>
                <SearchIcon className="header_inputButton"/>
            </div>
            <MenuIcon className="header_menuIcon"/>
            <div className="header_icons">
                <VideoCallIcon className="header_icon header_uploadVideo" onClick={()=>setUploadVideo(true)}/>
                <span className="header_uploadTooltip">Upload Video</span>
                <AppsIcons  className="header_icon"/>
                <NotificationsIcon className="header_icon"/>

                {loggedIn !== null ? 
                <>
                    <Avatar onClick={logout} className="header_avatar" src={avatar} />
                    <span className="header_logoutTooltip">Log Out</span>
                </>:
                <p className="header_loginText" onClick={()=>setLogin(true)}>Log in</p>
                }   
            </div>
                        
        </div> 
        <Upload open={uploadVideo} onClose={()=>setUploadVideo(false)}/>
        <Login open={login} onClose={()=>setLogin(false)} test={setLogin}/>
        </>       
    )
}

export default Header
