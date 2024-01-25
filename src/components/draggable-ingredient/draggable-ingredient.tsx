import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { TIngredient } from "../../services/types";
import { FC } from "react";

interface IDraggableIngredientProps {
  ingredient: TIngredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  handleRemoveIngredient: (uniqueId: string) => void;
}

interface IDragItem {
  index: number;
}

const DraggableIngredient: FC<IDraggableIngredientProps> = ({
  ingredient,
  index,
  moveIngredient,
  handleRemoveIngredient,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "sort-ingredient",
    item: { index } as IDragItem,
    collect: (monitor): { isDragging: boolean } => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  const [, dropRef] = useDrop({
    accept: "sort-ingredient",
    hover(item: IDragItem) {
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

export default DraggableIngredient;
