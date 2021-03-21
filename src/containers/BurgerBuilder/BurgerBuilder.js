import React, { useState, useEffect, useCallback } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';


const burgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();
    const onIngredientAdd = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

   
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el
            },0)
            return sum > 0;
    };

    const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchasing(true);
        }
        else{
            onSetAuthRedirectPath('/checkout');
            props.history.push("/auth");
        }
        
    };
    const purchaseCancelHandler = () =>{
       setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
           onInitPurchase();
           props.history.push("/checkout");
    };

    const disableInfo = {
        ...ings
    };

    for(let key in disableInfo){
        disableInfo[key] = disableInfo[key] <=0
    };

    let orderSummary = null;
    let burger = error ? <p style={{textAlign: 'center'}}>Ingredients dan't be loaded!</p> :  <Spinner />; 

    if(ings) {
        burger = (
            <React.Fragment>
                <Burger ingredients={ings}/>
                <BuildControls 
                ingredientAdded={onIngredientAdd}
                ingredientRemoved={onIngredientRemoved}
                disabled={disableInfo}
                purchasable={updatePurchaseState(ings)}
                ordered={purchaseHandler}
                isAuth={isAuthenticated}
                price={price}/>
            </React.Fragment>
        );
        orderSummary = (
            <OrderSummary 
            ingredients={ings}
            price={price}
            purchaseCanceled = {purchaseCancelHandler}
            purchaseContinue = {purchaseContinueHandler}/>     
        );
    };
    
    return(
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>  
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
};

export default withErrorHandler(burgerBuilder, axios);