// used in Modal
import React from 'react';
import './BackDrop.css';


const backdrop = (props) =>(
    props.show ? <div className="BackDrop" onClick={props.clicked}></div> : null
);


export default backdrop;
