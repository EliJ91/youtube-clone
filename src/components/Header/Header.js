import React from 'react'
import './Header.css'
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


function Header() {

    const [uploadVideo, setUploadVideo] = useState(true)

   

    

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
                <Avatar className="header__icon" src={AvatarImg}/>
            </div>            
        </div> 
        <Upload open={uploadVideo} onClose={()=>setUploadVideo(false)}/>
        
        </>       
    )
}

export default Header
