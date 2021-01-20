import React from 'react'
import './Sidebar.scss'
import SidebarRow from './SidebarRow/SidebarRow'
import HomeIcon from '@material-ui/icons/Home'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import OndemandVideoOutlinedIcon from '@material-ui/icons/OndemandVideoOutlined';
import HistoryIcon from '@material-ui/icons/History';
import YouTubeIcon from '@material-ui/icons/YouTube';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Sidebar(props) {
    return (
        <div className={`sidebar ${props.expandSidebar && "expanded"}`}>
            <SidebarRow Expand={props.expandSidebar} selected Icon={HomeIcon} title="Home"/>
            <SidebarRow Expand={props.expandSidebar} Icon={WhatshotIcon} title="Trending"/>
            <SidebarRow Expand={props.expandSidebar} Icon={SubscriptionsIcon} title="Subscription"/>
            <SidebarRow Expand={props.expandSidebar} Icon={YouTubeIcon} title="Originals"/>
            {props.expandSidebar && <hr/>}
            <SidebarRow Expand={props.expandSidebar} Icon={VideoLibraryIcon} title="Library"/>
            {props.expandSidebar && <> 
                <SidebarRow Expand={props.expandSidebar} Icon={HistoryIcon} title="History"/>
                <SidebarRow Expand={props.expandSidebar} Icon={OndemandVideoOutlinedIcon} title="Your movies"/>
                <SidebarRow Expand={props.expandSidebar} Icon={WatchLaterIcon} title="Watch later"/>
                <SidebarRow Expand={props.expandSidebar} Icon={ExpandMoreIcon} title="Show more"/>
            </>}
            {props.expandSidebar && <hr/>}
        </div>
    )
}

export default Sidebar
