import React from 'react'
import SidebarRow from './SidebarRow/SidebarRow'
import './Sidebar.scss'
import HomeIcon from '@material-ui/icons/Home'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoOutlinedIcon from '@material-ui/icons/OndemandVideoOutlined';
import TheatersIcon from '@material-ui/icons/Theaters';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Sidebar() {
    return (
        <div className="sidebar">
            {/* <SidebarRow selected Icon={HomeIcon} title="Home"/>
            <SidebarRow Icon={WhatshotIcon} title="Trending"/>
            <SidebarRow Icon={SubscriptionsIcon} title="Subscription"/>
            <hr/>
            <SidebarRow Icon={VideoLibraryIcon} title="Library"/>
            <SidebarRow Icon={HistoryIcon} title="History"/>
            <SidebarRow Icon={OndemandVideoOutlinedIcon} title="Your videos"/>
            <SidebarRow Icon={TheatersIcon} title="Your movies"/>
            <SidebarRow Icon={WatchLaterIcon} title="Watch later"/>
            <SidebarRow Icon={ExpandMoreIcon} title="Show more"/>
            <hr/> */}

            <SidebarRow selected Icon={HomeIcon} title="Home"/>
            <SidebarRow Icon={WhatshotIcon} title="Trending"/>
            <SidebarRow Icon={SubscriptionsIcon} title="Subscription"/>
            <SidebarRow Icon={OndemandVideoOutlinedIcon} title="Originals"/>
            <SidebarRow Icon={VideoLibraryIcon} title="Library"/>
            
        </div>
    )
}

export default Sidebar
