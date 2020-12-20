import React from 'react';
import './BuildControl.css';  
                                            

const buildControl = (props) => (
    <div className="BuildControl"> 
        <div className="Label">{props.label}</div> {/**props.label represent the labels of the ingredients given in BuildControls */}
        <button 
            className="Less"  
            onClick={props.removed}             //onclick of this button it removes the ingredient which we need to remove
            disabled={props.disabled}           // to show the button as disabled 
            >Less</button>
        <button 
            className="More" 
            onClick={props.added}               //on click of this button it adds the ingredient
            >More</button>  
    </div>
);


export default buildControl;