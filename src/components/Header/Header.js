import React from 'react'
import './Header.scss'
import SearchIcon from '@material-ui/icons/Search'
import VideoCallIcon from '@material-ui/icons/VideoCall'
import AppsIcons from '@material-ui/icons/Apps'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NotificationsIcon from '@material-ui/icons/Notifications'
import Avatar from '@material-ui/core/Avatar'
import Logo from './img/logo.svg'
import Upload from '../Upload/Upload'

import {Link} from 'react-router-dom'
import NewLoginUi from '../Login/newLoginUi'
import '../Login/newLoginUi.scss'
import MenuIcon from '@material-ui/icons/Menu';
import useHeaderLogic from './HeaderLogic'


var prevScrollpos = window.pageYOffset;
if( window.innerWidth<800){
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.top = "0";
    } else {
        document.getElementById("header").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
    }
}



function Header(props) {

    const {uploadVideo, setUploadVideo, login, logout, setLogin, mobileSearchMenu, setMobileSearchMenu, onOff, setOnOff, loggedIn, avatar} = useHeaderLogic()

    

    return (
        <>
        <div id="header" className="header">
            <NewLoginUi onOff={onOff} toggle={setOnOff}/>
            {window.innerWidth < 800 ? 
            <div className="header_menu_mobile">
                <Link to='/' ><img className="header_logo" src={Logo} alt=""/></Link>
                <div className="spacer"/>
                <SearchIcon className="header_searchButton" onClick={()=>{setMobileSearchMenu(true)}} />
                {loggedIn !== null ? 
                <>
                    <Avatar onClick={logout} className="header_avatar" src={avatar} />
                    <span className="header_logoutTooltip">Log Out</span>
                </>:
                <p className="header_loginText" onClick={()=>setOnOff(true)}>Log in</p>
                }
                

                <div className={`header_search_mobile ${mobileSearchMenu ? "": "hide"}`}>
                    <ArrowBackIcon onClick={()=>{setMobileSearchMenu(false)}} className="header_searchBackButton" />
                    <input className="searchInputField" placeholder="Search" type="text"></input>
                    <SearchIcon className="header_searchButton" onClick={()=>{setMobileSearchMenu(true)}} />
                </div>
            </div>
            : <>
            <div className="header_left">
                <MenuIcon className="header_menuIcon" onClick={()=>{props.setExpandSidebar(!props.expandSidebar)}}/>
                <Link to='/' ><img className="header_logo" src={Logo} alt=""/></Link>
            </div>

            <div className="header_searchInput">
                <input className="searchInputField" placeholder="Search" type="text"></input>
                <SearchIcon className="header_searchButton"/>
            </div>
    
            <div className="header_icons">
                <div className="uploadContainer icon_container" onClick={()=>setUploadVideo(true)}><VideoCallIcon className="header_icon header_uploadVideo" /></div>
                    <span className="header_uploadTooltip">Upload Video</span>
                <div className="appsContainer icon_container"><AppsIcons  className="header_icon header_apps"/></div>
                    <span className="header_appsTooltip">Apps</span>
                <div className="notificationsContainer icon_container"><NotificationsIcon className="header_icon header_notifications"/></div>
                    <span className="header_notificationsTooltip">Notifications</span>

                {loggedIn !== null ? 
                <>
                    <div className="avatarContainer "><Avatar onClick={logout} className="header_avatar" src={avatar} /></div>
                    <span className="header_logoutTooltip">Log Out</span>
                </>:
                <div className="avatarContainer "><p className="header_loginText" onClick={()=>setOnOff(true)}>Log in</p></div>
                }   
            </div>
        </>}
        </div> 
        <Upload open={uploadVideo} onClose={()=>setUploadVideo(false)}/>
        </>       
    )
}

export default Header
