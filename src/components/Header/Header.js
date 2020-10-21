import React from 'react'
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


function Header() {

    const [uploadVideo, setUploadVideo] = useState(false)
    const [login, setLogin] = useState(false)
    const dispatch = useDispatch()

   
    const loggedIn = useSelector(store=>store.username)
    const avatar = useSelector(store=>store.avatar)

    function logout(e){
        e.preventDefault()
        dispatch(LOGGED_IN(defaultState))
        axios.post(process.env.REACT_APP_API_PREFIX+"/api/user/deletecookie",{},{withCredentials: true})
      }

    return (
        <>
        <div className="header">

            <div className="header__left">
                <MenuIcon className="header__menuIcon"/>
                <img className = "header__logo" src={Logo} alt=""/>
            </div>

            <div className="header__input">
                <input placeholder="Search" type="text"></input>
                <SearchIcon className="header__inputButton"/>
            </div>

            <div className="header__icons">
                <VideoCallIcon className="header__icon header__uploadVideo" onClick={()=>setUploadVideo(true)}/>
                <span className="header__uploadVideo_tooltip">Upload Video</span>
                <AppsIcons className="header__icon"/>
                <NotificationsIcon className="header__icon"/>

                {loggedIn !== null ? 
                <><Avatar onClick={logout} className="header__avatar" src={avatar !== null ? avatar : null} />
                <span className="header__logout_tooltip">Log Out</span></>:
                <p className="header__loginText" onClick={()=>setLogin(true)}>Log in</p>
                
                }   
            </div>            
        </div> 
        <Upload open={uploadVideo} onClose={()=>setUploadVideo(false)}/>
        <Login open={login} onClose={()=>setLogin(false)} test={setLogin}/>
        </>       
    )
}

export default Header
