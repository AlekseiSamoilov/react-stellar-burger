import { ADD_BUN, ADD_INGREDIENT, PLACE_ORDER_FAIL, PLACE_ORDER_START, PLACE_ORDER_SUCCESS, REMOVE_INGREDIENT, RESET_CONSTRUCTOR, SORT_INGREDIENTS, SET_INGREDIENTS } from "../actions/actionTypes";

const initialState = {
    ingredients: [],
    bun: null,
    totalPrice: 0,
    allIngredients: [],
    currentIngredient: null,
    order: null,
};

export function burgerReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_INGREDIENT:
            const newIngredient = {
                ...action.payload,
                uniqueId: `${action.payload._id}_${new Date().getTime()}`
              };
              
              return {
                ...state,
                ingredients: [...state.ingredients, newIngredient],
                totalPrice: state.totalPrice + action.payload.price,
              };
        case ADD_BUN:
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
        case SET_INGREDIENTS: 
        return {
            ...state, 
            allIngredients: action.payload,
        };
        case PLACE_ORDER_START:
            return {
                ...state,
                isLoading: true,
            };
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
            };
        case PLACE_ORDER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
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