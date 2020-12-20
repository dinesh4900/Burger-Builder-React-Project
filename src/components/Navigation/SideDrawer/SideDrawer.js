import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
    let attachedClasses = ["SideDrawer" , "Close"]

    if(props.open){
        attachedClasses = ["SideDrawer" , "Open"]
    }
    return(
        <Aux>
           <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className="LogoDrawer">
                    <Logo />
                </div> 
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};


export default sideDrawer;