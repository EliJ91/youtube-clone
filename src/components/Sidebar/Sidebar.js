import React from 'react'
import './Sidebar.scss'
import SidebarRow from './SidebarRow/SidebarRow'
import HomeIcon from '@material-ui/icons/Home'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import OndemandVideoOutlinedIcon from '@material-ui/icons/OndemandVideoOutlined';



function Sidebar(props) {
    return (
        <div className={`sidebar ${props.expandSidebar && "expanded"}`}>
            <SidebarRow Expand={props.expandSidebar} selected Icon={HomeIcon} title="Home"/>
            <SidebarRow Expand={props.expandSidebar} Icon={WhatshotIcon} title="Trending"/>
            <SidebarRow Expand={props.expandSidebar} Icon={SubscriptionsIcon} title="Subscription"/>
            <SidebarRow Expand={props.expandSidebar} Icon={OndemandVideoOutlinedIcon} title="Originals"/>
            <SidebarRow Expand={props.expandSidebar} Icon={VideoLibraryIcon} title="Library"/>
            {props.expandSidebar && 
            <>
                <SidebarRow Expand={props.expandSidebar} Icon={HomeIcon} title="Home"/>
                <SidebarRow Expand={props.expandSidebar} Icon={WhatshotIcon} title="Trending"/>
                <SidebarRow Expand={props.expandSidebar} Icon={SubscriptionsIcon} title="Subscription"/>
                <SidebarRow Expand={props.expandSidebar} Icon={OndemandVideoOutlinedIcon} title="Originals"/>
                <SidebarRow Expand={props.expandSidebar} Icon={VideoLibraryIcon} title="Library"/>
                <SidebarRow Expand={props.expandSidebar} Icon={HomeIcon} title="Home"/>
                <SidebarRow Expand={props.expandSidebar} Icon={WhatshotIcon} title="Trending"/>
                <SidebarRow Expand={props.expandSidebar} Icon={SubscriptionsIcon} title="Subscription"/>
                <SidebarRow Expand={props.expandSidebar} Icon={OndemandVideoOutlinedIcon} title="Originals"/>
                <SidebarRow Expand={props.expandSidebar} Icon={VideoLibraryIcon} title="Library"/>
                <SidebarRow Expand={props.expandSidebar} Icon={HomeIcon} title="Home"/>
                <SidebarRow Expand={props.expandSidebar} Icon={WhatshotIcon} title="Trending"/>
                <SidebarRow Expand={props.expandSidebar} Icon={SubscriptionsIcon} title="Subscription"/>
                <SidebarRow Expand={props.expandSidebar} Icon={OndemandVideoOutlinedIcon} title="Originals"/>
                <SidebarRow Expand={props.expandSidebar} Icon={VideoLibraryIcon} title="Library"/>
                <SidebarRow Expand={props.expandSidebar} Icon={HomeIcon} title="Home"/>
                <SidebarRow Expand={props.expandSidebar} Icon={WhatshotIcon} title="Trending"/>
                <SidebarRow Expand={props.expandSidebar} Icon={SubscriptionsIcon} title="Subscription"/>
                <SidebarRow Expand={props.expandSidebar} Icon={OndemandVideoOutlinedIcon} title="Originals"/>
                <SidebarRow Expand={props.expandSidebar} Icon={VideoLibraryIcon} title="Library"/>
                </>
            }
        </div>
    )
}

export default Sidebar
