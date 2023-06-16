/* Общие импорты */
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { DELETE_INGREDIENT } from "../../../services/actions";
import { useDrop, useDrag } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientPropTypes from "../../utils/ingredient-prop-types";

/* Стили */
import burgerConstructorElementStyles from "./burger-constructor-element.module.scss";

const BurgerConstructorElement = (props) => {
  const { name, price, image, _id } = props.ingredient;
  const { index, moveIngredient } = props;

  const dispatch = useDispatch();
  const ref = useRef();

  const removeIngredient = (ingredient) => {
    dispatch({
      type: DELETE_INGREDIENT,
      data: ingredient._id,
    });
  };

  const [, drop] = useDrop({
    accept: "ingredientList",
    hover(item, focus) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = focus.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [, dragRef] = useDrag({
    type: "ingredientList",
    item: () => {
      return { _id, index };
    },
  });

  dragRef(drop(ref));

  return (
    <div ref={ref} className={burgerConstructorElementStyles.burgerElement}>
      <DragIcon
        className={burgerConstructorElementStyles.burgerElement__icon}
        type="primary"
      />

      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => removeIngredient(props.ingredient)}
      />
    </div>
  );
};

BurgerConstructorElement.propTypes = {
  ingredient: IngredientPropTypes.isRequired,
  index: PropTypes.number,
  moveIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructorElement;
