/** Used t create the modal of the summary 
 *  we place the modal in burger builder
 *  we should add it in the place where it should be logical so we use it in Burger builder 
*/
import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Aux';
import BackDrop from '../Backdrop/Backdrop'

const modal =(props) => (
   <Aux> 
       {/**use modal closed and add it in burger builder and call purchase cancell handler method to backddrop */}
       <BackDrop show={props.show} clicked={props.modalClosed}/>  
        <div className="Modal"
        //inline styling where summary should be shown
            style={{
                transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity : props.show ? '1' : '0'
            }}> 
            {/**  shows the contents of the summary*/}
            {props.children} 
        </div> 
   </Aux>
);

export default modal;