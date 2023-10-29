import { ADD_BUN, ADD_INGREDIENT, RESET_CONSTRUCTOR } from "../actions/actionTypes";

export function burgerReducer(state, action) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient],
                totalPrice: state.totalPrice + action.ingredient.price,
            };
        case ADD_BUN: 
        return {
            ...state,
            bun: action.bun,
            totalPrice: state.totalPrice + action.bun.price * 2,
        };
        case RESET_CONSTRUCTOR:
            return {
                ingredient: [],
                bun: null,
                totalPrice: 0,
            };
        default:
            throw new Error(`Error: ${action.type}`)
    }
}