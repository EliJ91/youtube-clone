import React from 'react'
import './Header.scss'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'
import VideoCallIcon from '@material-ui/icons/VideoCall'
import AppsIcons from '@material-ui/icons/Apps'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Avatar from '@material-ui/core/Avatar'
import Logo from './img/logo.svg'
import AvatarImg from './img/avatar.jpg'
import {useState} from 'react';
import Upload from '../Upload/Upload'
import Login from '../Login/Login'


function Header() {

    const [uploadVideo, setUploadVideo] = useState(false)
    const [login, setLogin] = useState(true)

   
    const loggedIn = false;
    

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

                {loggedIn ? 
                <Avatar className="header__icon" src={AvatarImg}/>:
                <p className="header__loginText" onClick={()=>setLogin(true)}>Log in</p>
                
                }   
            </div>            
        </div> 
        <Upload open={uploadVideo} onClose={()=>setUploadVideo(false)}/>
        <Login open={login} onClose={()=>setLogin(false)}/>
        </>       
    )
}

export default Header
