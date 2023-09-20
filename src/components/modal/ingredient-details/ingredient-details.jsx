import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import { data } from "../../../utils/data";

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.order_container}>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <img
        src="https://code.s3.yandex.net/react/code/bun-02-large.png"
        className={styles.ingredient_image}
      />
      <p className={`text text_type_main-small ${styles.ingredient_name}`}>
        Биокотлета из марсианской Магнолии
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
            244,4
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
            12,2
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
            17,2
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
            10,2
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
