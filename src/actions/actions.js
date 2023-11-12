import { 
    ADD_BUN, 
    ADD_INGREDIENT, 
    RESET_CONSTRUCTOR, 
    SET_INGREDIENTS, 
    PLACE_ORDER_SUCCESS, 
    PLACE_ORDER_START, 
    PLACE_ORDER_FAIL,
    REMOVE_INGREDIENT,
    SORT_INGREDIENTS,
} from "./actionTypes";


export const addIngredient = (ingredient) => ({
type: ADD_INGREDIENT,
payload: ingredient,
});

export const addBun = (bun) => ({
    type: ADD_BUN,
    payload: bun,
});

export const resetConstructor = () => ({
    type: RESET_CONSTRUCTOR,
});

export const setIngredients = (ingredients) => ({
    type: SET_INGREDIENTS,
    payload: ingredients,
});
// Place Order 
export const placeOrderStart = () => ({
    type: PLACE_ORDER_START,
})

export const placeOrderSuccess = (orderNumber) => ({
    type: PLACE_ORDER_SUCCESS,
    payload: orderNumber,
});

export const placeOrderFail = (error) => ({
    type: PLACE_ORDER_FAIL,
    payload: error,
});

export const removeIngredient = (ingredientId) => {
    return {
        type: REMOVE_INGREDIENT,
        payload: ingredientId,
    };
}

export const sortIngredient = (payload) => ({
type: SORT_INGREDIENTS,
payload,
});
