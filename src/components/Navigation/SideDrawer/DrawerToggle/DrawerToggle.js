import React from 'react';
import './DrawerToggle.css'

const drawerToggle = (props) =>(
    <div className="DrawerToggle" onClick={props.clicked}>
        {/* creating toggle icon */}
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;