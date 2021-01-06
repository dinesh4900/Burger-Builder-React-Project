import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner  from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

// Prices of the ingredients
const INGREDIENT_PRICES = {
    salad:1,
    cheese:1,                          
    meat:3,
    bacon:2,
}
class BurgerBuilder extends Component{
   
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
      
    state = {
        ingredients:null,
        totalPrice: 30,
        purchasable: false, // initially false, it should become true once we can buy this burger i.e., ingredient is added
        purchasing : false, // it decides to show ordersummary or not
        loading: false,
        error: false
    }
    componentDidMount(){
        axios.get('https://react-burger-builder-5869e-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients : response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    updatePurchaseState = (ingredients) => {
        
        const sum =  Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })   // creates an arrays of  values 

            /** to reduce the array to turn it into single number
             *  starting number as zero
             * sum is constantly updated current sum once the iteration is updated the sum is the final value
             * element is the number and it is accesed in ingredients[igKey]
             */
             .reduce((sum,el)=> sum + el , 0);
            // if one ingredient is present then purchasable is true and vice versa
        this.setState ({purchasable: sum>0});       
    }
  
      
    // to add Ingredients....
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; // To know the old ingredients 
        const updatedCount = oldCount+1; // oldCount value updated to updatedCount
        const updatedIngedients={           // State should be updated in immutable way. and we create a new JS object
            ...this.state.ingredients       // we use ES6 spread operator.to distribute the properties of old state to new object
        };
        updatedIngedients[type] = updatedCount; // Saving count values to updatedIngredients
        const priceAddition = INGREDIENT_PRICES[type]; // Updating the price of the respective ingredients added
        const oldPrice = this.state.totalPrice; // total price value is equal to oldprice
        const newPrice = oldPrice + priceAddition; //adding old price and priceAddition to add newPrice
        this.setState({totalPrice: newPrice,ingredients:updatedIngedients}); // this is the state update that does when a new ingredient is added or updated
        this.updatePurchaseState(updatedIngedients);  // used to enable the order now button
    }
    // to remove Ingredients....
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];

        // this condition will be used if the user trien to remove ingredients which are not added to the burger i.e., if burger is empty
        if (oldCount <= 0) {  
            return;
        }
        const updatedCount = oldCount-1; // while removing it reduces the count value
        const updatedIngedients={
            ...this.state.ingredients
        };
        updatedIngedients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];  //Updating the price of the respective ingredients reduced
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice,ingredients:updatedIngedients});
        this.updatePurchaseState(updatedIngedients );
    }
    
    //when order now button is clicked this method is executed 
    // we use arrow function because it takes the state or the context 
    puchaseHandler =() =>{
        this.setState({purchasing : true});
    }

    // clicking the backdrop means we need to cancel the purchase.so we set purchasing to false
    purchaseCancelHandler =() =>{
        this.setState({purchasing : false});
    }

    // to navigate to other page if pressing continue.....

    purchaseContinueHandler = () => {
        //alert('Continue To Check Out');
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: 'dinesh',
        //         address:{
        //             street: 'streets1',
        //             pincode: '517002',
        //             country: 'india',
        //         },
        //         email: 'king@gm.com'
        //     },
        //     deliveryMethod: 'fast'

        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false})
        //     }); 
        const queryParms = [];
        for(let i in this.state.ingredients){
            queryParms.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParms.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }


    render(){
        // Used to diable the less button if no ingredients is added.
        // It creates a copied information about ingredients i.e.,(disabledInfo) in an immutable way.
        // And it stores all the values of ingredients the object disabledInfo.
        // It loops through all the keys of disabledInfo (i.e., ingredients).
        // disabledInfo[key] is the value of the ingredients i.e.,  key i.e., zeros initially.
        // disabledInfo[key] <= 0 this condition will return either true or false
        const disabledInfo ={
            ...this.state.ingredients
        };
        
        for (let key in disabledInfo) { 
            disabledInfo[key]  = disabledInfo[key] <= 0;
        }
        ////////////////////////////////////////////////////////////
        let orderSummary = null; 
        //orderSummary = <Spinner />;
         

        let burger = this.state.error ? <p>Check your Internet Connectivity or Reload</p> : <Spinner />;

        if(this.state.ingredients){

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} /> 
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}       // it calls the method that adds ingredients
                        ingredientRemoved={this.removeIngredientHandler}  // it calls the method that removes ingredients
                        disabled={disabledInfo}                           // here we call the disabled info to deactivate less button
                        purchasable={this.state.purchasable}              // calling thr purchasable state
                        ordered={this.puchaseHandler}                     // it gets executed when we click orer now button.ordered is used in build controls
                        price={this.state.totalPrice}                     // to display the total price
                        />                    
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} // to dsplay the contents in burger
            price={this.state.totalPrice}       //to update the price of Burger in summary
            purchaseCancelled={this.purchaseCancelHandler}  //backdrop of the ordersummary modal
            purchaseContinued={this.purchaseContinueHandler}/>;
        }

       
        if(this.state.loading){
            orderSummary =<Spinner />;
        }


        return(
            <Aux>
                {/**we are wrapping this modal inside the order summary
                 * display the model
                 * only if purchasing is true the model will be shown
                 */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> {/**  we call modalClosed to disable the modal and backdrop*/}
                        {orderSummary}
                </Modal>
                {/**render the burger top and bottom */}
                {burger}
                
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios  ); 