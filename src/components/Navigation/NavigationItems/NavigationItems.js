import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems = () => (
    
    <ul className="NavigationItems">
        
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        <NavigationItem link="/" >Check Out</NavigationItem>
    </ul>
);

export default navigationItems;