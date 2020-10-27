import React from 'react'
import './SidebarRow.scss'

function SidebarRow({selected, title, Icon}) {
    return (
        <div className={`sidebarRow ${selected && 'sidebarRow_selected'}`}>
            <Icon  className="sidebarRow_icon"/>
            <h2 className="sidebarRow_title">{title}</h2>
        </div>
    )
}

export default SidebarRow
