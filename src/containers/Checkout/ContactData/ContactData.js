import React , {Component} from 'react';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css'
import axios from '../../../axios-order';


class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address : {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'dinesh',
                address:{
                    street: 'streets1',
                    pincode: '517002',
                    country: 'india',
                },
                email: 'king@gm.com'
            },
            deliveryMethod: 'fast'

        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false})
            }); 
    }
    render(){
        let form =(<form>
            <input className="Input" type="text" name="name" placeholder="your name" />
            <input className="Input" type="email" name="email" placeholder="your email" />
            <input className="Input" type="text" name="street" placeholder="street" />
            <input className="Input" type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return(
            <div className="ContactData">
                <h4>enter your contact data</h4>
                {form}
            </div>
        )
    }
}


export default ContactData;