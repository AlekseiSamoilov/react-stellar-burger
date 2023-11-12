import { SET_INGREDIENTS } from "../actions/actionTypes";

const initialDataState = {
    allIngredients: [],
};

export const loadData = (state = initialDataState, action) => {
    switch (action.type) {
        case SET_INGREDIENTS: 
        return {
            ...state, 
            allIngredients: action.payload,
        };
        default:
            return state;
    }
  };
  