import { ADD_BUN, ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_CONSTRUCTOR, SORT_INGREDIENTS, SET_INGREDIENTS } from "../actions/actionTypes";
import { TAddBunAction, TAddIngredientAction, TRemoveIngredientAction, TResetConstructorAction, TSortIngredientAction } from "../actions/constructorActions";
import { IIngredientsData } from "./types";

export interface IConstructorState {
  ingredients: IIngredientsData[];
  bun: IIngredientsData | null;
  totalPrice: number;
  allIngredients: IIngredientsData[];
  currentIngredient: IIngredientsData | null;
  order: number | null;
}

export type TConstructorActions = 
  | TAddIngredientAction
  | TAddBunAction
  | TResetConstructorAction
  | TRemoveIngredientAction
  | TSortIngredientAction;

const initialState: IConstructorState = {
    ingredients: [],
    bun: null,
    totalPrice: 0,
    allIngredients: [],
    currentIngredient: null,
    order: null,
};

export function constructorReducer(state = initialState, action: TConstructorActions) {
    switch (action.type) {
        case ADD_INGREDIENT:       
        console.log(action.payload)  
              return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                totalPrice: state.totalPrice + action.payload.price,
              };
        case ADD_BUN:
          console.log("Bun",action.payload) 
            const newTotalPrice = state.bun ? state.totalPrice - state.bun.price * 2 : state.totalPrice;
            return {
                  ...state,
                  bun: action.payload,
                  totalPrice: newTotalPrice + action.payload.price * 2, 
                };
        case RESET_CONSTRUCTOR:
            return {
                ...initialState,
                allIngredients: state.allIngredients,
            };

            case REMOVE_INGREDIENT:
                const updatedIngredients = state.ingredients.filter(ingredient => ingredient.uniqueId !== action.payload);
                const removedIngredient = state.ingredients.find(ingredient => ingredient.uniqueId === action.payload);
                const updatedTotalPrice = removedIngredient ? state.totalPrice - removedIngredient.price : state.totalPrice;
              
                return {
                  ...state,
                  ingredients: updatedIngredients,
                  totalPrice: updatedTotalPrice,
                };
                case SORT_INGREDIENTS:

                    const { dragIndex, hoverIndex } = action.payload;
                    const newIngredients = [...state.ingredients];
                    const draggedIngredient = newIngredients[dragIndex];
                    newIngredients.splice(dragIndex, 1);
                    newIngredients.splice(hoverIndex, 0, draggedIngredient);
                  
                    return {
                      ...state,
                      ingredients: newIngredients,
                    };
                  

        default:
            return state;
    }
}