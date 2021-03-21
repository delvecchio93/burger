import * as acitonTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null, 
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const addIngredients = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case acitonTypes.ADD_INGREDIENT: return addIngredients(state, action); 
        case acitonTypes.REMOVE_INGREDIENT:
            const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ...state,
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                building: true
            };
            return updateObject(state, updatedSt); 
        case acitonTypes.SET_INGREDIENTS: 
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            });
        case acitonTypes.FATCH_INGREDIENTS_FAILED: 
            return updateObject(state, {error: true});
         default: 
            return state;
    }
};

export default reducer;