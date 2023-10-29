export function burgerReducer(state, action) {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient],
                totalPrice: state.totalPrice + action.ingredient.price,
            };
        case 'ADD_BUN': 
        return {
            ...state,
            bun: action.bun,
            totalPrice: state.totalPrice + action.bun.price * 2,
        };
        default:
            throw new Error(`Error: ${action.type}`)
    }
}