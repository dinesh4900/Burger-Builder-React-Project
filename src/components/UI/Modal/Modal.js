/** Used t create the modal of the summary 
 *  we place the modal in burger builder
 *  we should add it in the place where it should be logical so we use it in Burger builder 
*/
import React, { Component } from 'react';
import './Modal.css';
import Aux from '../../../hoc/Aux';
import BackDrop from '../Backdrop/Backdrop'

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.childern !== this.props.children;
    }

    componentWillUpdate(){
        console.log('[Modal] WillUpdate');
    }
    render() {
        return(<Aux> 
            {/**use modal closed and add it in burger builder and call purchase cancell handler method to backddrop */}
            <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>  
             <div className="Modal"
             //inline styling where summary should be shown
                 style={{
                     transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity : this.props.show ? '1' : '0'
                 }}> 
                 {/**  shows the contents of the summary*/}
                 {this.props.children} 
             </div> 
        </Aux>)
    }
} 

export default Modal;