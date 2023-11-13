import { 
    ADD_BUN, 
    ADD_INGREDIENT, 
    RESET_CONSTRUCTOR, 
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
