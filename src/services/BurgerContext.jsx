import React, { useReducer } from "react";
import { burgerReducer } from "./burgerReducer";

const IngredientContext = React.createContext();

export const BurgerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(burgerReducer);

  return (
    <IngredientContext.Provider value={{ state, dispatch }}>
      {children}
    </IngredientContext.Provider>
  );
};
export default IngredientContext;
