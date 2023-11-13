import { SET_INGREDIENTS } from "./actionTypes";

export const setIngredients = (ingredients) => ({
    type: SET_INGREDIENTS,
    payload: ingredients,
});