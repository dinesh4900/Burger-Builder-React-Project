import React from 'react';
import './BuildControl.css';


const buildControl = (props) => (
    <div> 
        <div className="Label">{props.label}</div>
        <button 
            className="Less"  
            onClick={props.removed}
            disabled={props.disabled}>less</button>
        <button 
            className="More" 
            onClick={props.added} >more</button>
    </div>
);


export default buildControl;