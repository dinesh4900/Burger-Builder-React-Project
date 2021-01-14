import React from 'react';
import './Toolbar.css';
import Logo from '../../Layout/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'; 


const toolbar =(props) =>(
    <header className="Toolbar">
            {/** */}  
            <DrawerToggle clicked={props.drawerToggleClicked} /> 
            <div className="LogoToolbar">
            <Logo />
            </div>

        {/**this displays only on deskttop view */}
        <nav className="DesktopOnly">
            <NavigationItems />
        </nav>
    </header>
);


export default toolbar;