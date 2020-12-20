import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
                        

const burger = (props) =>{
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return[...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + 1 } type={igKey} />;
            });
        })

        .reduce((arr , el) => {
            return arr.concat(el)
        },[]);

    // If there is no ingredients then it gives message to add ingredients
    if (transformedIngredients.length === 0){
       transformedIngredients = <p>Start adding ingredients...</p>;
    }
    return( 
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>

    );
};


export default burger;