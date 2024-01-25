import { IIngredientsData, TIngredient } from "../services/types";
import { 
    ADD_BUN, 
    ADD_INGREDIENT, 
    RESET_CONSTRUCTOR, 
    REMOVE_INGREDIENT,
    SORT_INGREDIENTS,
} from "./actionTypes";

export type TAddIngredientAction = {
   readonly type: typeof ADD_INGREDIENT;
   payload: TIngredient;
}

export type TAddBunAction = {
    readonly type: typeof ADD_BUN;
    payload: TIngredient;
}

export type TResetConstructorAction = { 
    readonly type: typeof RESET_CONSTRUCTOR;
}

export type TRemoveIngredientAction = {
    readonly type: typeof REMOVE_INGREDIENT;
    payload: string;
}

export type TSortIngredientPayloadAction = {
    dragIndex: number;
    hoverIndex: number;
}

export type TSortIngredientAction = {
    readonly type: typeof SORT_INGREDIENTS;
    payload: TSortIngredientPayloadAction;
}


export const addIngredient = (ingredient: TIngredient): TAddIngredientAction => ({
type: ADD_INGREDIENT,
payload: ingredient,
});

export const addBun = (bun: TIngredient): TAddBunAction => ({
    type: ADD_BUN,
    payload: bun,
});

export const resetConstructor = (): TResetConstructorAction => ({
    type: RESET_CONSTRUCTOR,
});


export const removeIngredient = (ingredientId: string): TRemoveIngredientAction => {
    return {
        type: REMOVE_INGREDIENT,
        payload: ingredientId,
    };
}

export const sortIngredient = (payload: TSortIngredientPayloadAction): TSortIngredientAction => ({
type: SORT_INGREDIENTS,
payload,
});