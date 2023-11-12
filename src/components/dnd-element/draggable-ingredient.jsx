import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import PropTypes from "prop-types";

const DraggableIngredient = ({
  ingredient,
  index,
  moveIngredient,
  handleRemoveIngredient,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "sort-ingredient",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  const [, dropRef] = useDrop({
    accept: "sort-ingredient",
    hover(item) {
      if (item.index !== index) {
        moveIngredient(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <li ref={(node) => dragRef(dropRef(node))} draggable style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleRemoveIngredient(ingredient.uniqueId)}
      />
    </li>
  );
};

DraggableIngredient.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  handleRemoveIngredient: PropTypes.func.isRequired,
};

export default DraggableIngredient;
