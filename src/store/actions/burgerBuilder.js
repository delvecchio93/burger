import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}
//-------------------------------------------------------------------
export const setIngderients = (ingredients) => {
    return {
          type: actionTypes.SET_INGREDIENTS,
          ingredients: ingredients
    }
}

export const fatchIngredientsFailed = () => {
    return {
        type: actionTypes.FATCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-9d0ba.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngderients(response.data))
        })
        .catch(error => {
            dispatch(fatchIngredientsFailed())
        });
    }
}
//-------------------------------------------------------------------