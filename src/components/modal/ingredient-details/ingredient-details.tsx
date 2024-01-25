import styles from "./ingredient-details.module.css";
import { IIngredientsData } from "../../../services/types";
import { FC } from "react";

interface IIngredientDetailsProps {
  ingredient: IIngredientsData;
}

const IngredientDetails: FC<IIngredientDetailsProps> = ({ ingredient }) => {
  return (
    <div className={styles.order_container}>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.ingredient_image}
      />
      <p className={`text text_type_main-medium ${styles.ingredient_name}`}>
        {ingredient.name}
      </p>
      <ul className={styles.composition_container}>
        <li className={styles.composition_cell}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.compostiton_text}`}
          >
            Калории,ккал
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.compostiton_text}`}
          >
            {ingredient.calories}
          </p>
        </li>
        <li className={styles.composition_cell}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.compostiton_text}`}
          >
            Белки, г
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.compostiton_text}`}
          >
            {ingredient.proteins}
          </p>
        </li>
        <li className={styles.composition_cell}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.compostiton_text}`}
          >
            Жиры, г
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.compostiton_text}`}
          >
            {ingredient.fat}
          </p>
        </li>
        <li className={styles.composition_cell}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.compostiton_text}`}
          >
            Углеводы, г
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.compostiton_text}`}
          >
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
