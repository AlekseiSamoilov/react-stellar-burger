import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import IngredientDetails from "../../components/modal/ingredient-details/ingredient-details";
import { IIngredientsData } from "../../services/types";
import { useAppSelector } from "../../hooks/useAppSelector";

const IngredientDetailsPage: FC = () => {
  const { id } = useParams();
  const ingredients = useAppSelector(state => state.load.allIngredients);
  const [ingredient, setIngredient] = useState<IIngredientsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const isModal = location.state?.modal;

  useEffect(() => {
    if (ingredients.length) {
      const foundIngredient = ingredients.find((item) => item._id === id);
      setIngredient(foundIngredient || null);
      setIsLoading(false);
    }
  }, [id, ingredients]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isModal || ingredient === null) {
    return null;
  }
  return (
    <div>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};
export default IngredientDetailsPage;
