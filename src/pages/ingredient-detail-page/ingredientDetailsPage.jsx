import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import IngredientDetails from "../../components/modal/ingredient-details/ingredient-details";

const IngredientDetailsPage = () => {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.load.allIngredients);
  const [ingredient, setIngredient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isModal = location.state?.modal;

  useEffect(() => {
    if (ingredients.length) {
      const foundIngredient = ingredients.find((item) => item._id === id);
      setIngredient(foundIngredient);
      setIsLoading(false);
    }
  }, [id, ingredients]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isModal) {
    return null;
  }
  return (
    <div>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};
export default IngredientDetailsPage;
