import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'



class OrderSummary extends Component {
    componentDidUpdate(){
        console.log('[OrderSummary] WillUpdate')
    }
    render(){
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
                <h3>your order</h3>
                <p>amazing burger with yout ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price :{this.props.price.toFixed(2)}</strong></p>
                <p>continue to cekout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>continue</Button>

            </Aux>
        );
    }
}
  
   




export default OrderSummary;