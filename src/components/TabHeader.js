import React from 'react'

import { Nav } from 'react-bootstrap'
import { FaWindowClose } from 'react-icons/fa'

//import '../tabs.css'

const TabHeader = (props) => {
    return (
        <Nav.Item style={{padding: '0.5rem 1rem'}}>
            <span>{props.title}</span>
            <FaWindowClose id="closeTab" onClick={() => props.handleCreateMissionFile(props.title)} />
        </Nav.Item>
    )
}

export default TabHeader

/*
<a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>


*/
