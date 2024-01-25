import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import IngredientDetails from "../../components/modal/ingredient-details/ingredient-details";
import { IRootState } from "../../services/rootReducer";
import { IIngredientsData } from "../../services/types";

const IngredientDetailsPage: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector((state: IRootState) => state.load.allIngredients);
  const [ingredient, setIngredient] = useState<IIngredientsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
