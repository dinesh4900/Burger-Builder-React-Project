import React from 'react';
import './Button.css';


// 24 video
const button = (props) =>(
    <button 
        className= {["Button",[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);



export default button;