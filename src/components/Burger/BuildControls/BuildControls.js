// Creating Functional Component

import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    
];

const buildControls =(props) => (
    <div className="BuildControls"> 
    {/** to print the price of the burger built and fixing it to two decimal points*/}
    <p>Current price:<strong>{props.price.toFixed(2)}</strong></p>  
        {/** Creates a loop on controls objectm  */}
        {controls.map(ctrl => ( 
            <BuildControl 
                key={ctrl.label}    // to access the key and label
                
                added={() => props.ingredientAdded(ctrl.type)}      // an arrow function to represent item which should be added
                removed={() => props.ingredientRemoved(ctrl.type)}   // an arrow function to represent item which should be removed

                // here we use disabled display the button as disabled.
                // we use control type to access the disabled information.
                // the structure of diasbled info is in boolean format respectively.
                disabled={props.disabled[ctrl.type]}
                
                label={ctrl.label} />             
        ))}
         {/**order now button
          *
          * 
          */}
        <button className= "OrderButton"
        disabled={!props.purchasable}               // (!) is used because if purchasable is not true it gets disabled and vice versa
        onClick={props.ordered}>ordernow</button>   
    
    </div>
);

export default buildControls;