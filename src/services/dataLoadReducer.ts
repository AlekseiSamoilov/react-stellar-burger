import { SET_INGREDIENTS } from "../actions/actionTypes";
import { ISetIngredient } from "../actions/dataLoadActions";
import { IIngredientsData } from "./types";

export interface ILoadDataState {
    allIngredients: IIngredientsData[]
}

const initialDataState: ILoadDataState = {
    allIngredients: [],
};

export const loadData = (state = initialDataState, action: ISetIngredient) => {
    switch (action.type) {
        case SET_INGREDIENTS: 
        console.log(action.payload)
        return {
            ...state, 
            allIngredients: action.payload,
            
        };
        default:
            return state;
    }
  };
  