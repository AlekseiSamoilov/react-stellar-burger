import { TIngredient } from "../services/types";
import { SET_INGREDIENTS } from "./actionTypes";

export interface ISetIngredient  {
    readonly type: typeof SET_INGREDIENTS;
    payload: TIngredient;
}

export const setIngredients = (ingredients: TIngredient): ISetIngredient => ({
    type: SET_INGREDIENTS,
    payload: ingredients,
});