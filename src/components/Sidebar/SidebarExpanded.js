import React from 'react'
import './Sidebar.scss'
import SidebarRow from './SidebarRow/SidebarRow'
import HomeIcon from '@material-ui/icons/Home'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoOutlinedIcon from '@material-ui/icons/OndemandVideoOutlined';
import TheatersIcon from '@material-ui/icons/Theaters';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



function SidebarExpanded() {
    return (
        <div className="sidebarExpanded">
            <SidebarRow Type="expanded" class="sidebarExpanded_row" selected Icon={HomeIcon} title="Home"/>
            <SidebarRow Type="expanded"  Icon={WhatshotIcon} title="Trending"/>
            <SidebarRow Type="expanded"  Icon={SubscriptionsIcon} title="Subscription"/>
            <SidebarRow Type="expanded"  Icon={VideoLibraryIcon} title="Library"/>
            <SidebarRow Type="expanded"  Icon={HistoryIcon} title="History"/>
            <SidebarRow Type="expanded"  Icon={OndemandVideoOutlinedIcon} title="Your videos"/>
            <SidebarRow Type="expanded"  Icon={TheatersIcon} title="Your movies"/>
            <SidebarRow Type="expanded"  Icon={WatchLaterIcon} title="Watch later"/>
            <SidebarRow Type="expanded"  Icon={ExpandMoreIcon} title="Show more"/>
            
        </div>
    )
}

export default SidebarExpanded
