// The contents of order summary
import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component{
    componentDidUpdate(){
        console.log('[OrderSummary] WillUpdate')
    }
    render(){
        // creating pop-up message showing ingredient details
        // Object.keys will transform this into an array of ingredients

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>
            );
        });
        
        
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Amazing burger with your ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price :{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                {/** onclick of this button it calls the methoda in burger builder and order summary component*/}
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>

            </Aux>
        );
    }
}
  
   

export default OrderSummary;
