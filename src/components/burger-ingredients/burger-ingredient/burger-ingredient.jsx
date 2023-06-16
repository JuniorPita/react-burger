/* Общие импорты */
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd/dist/hooks";
import PropTypes from "prop-types";

/* Стили */
import burgerIngredientStyles from "./burger-ingredient.module.scss";

const BurgerIngredient = (props) => {
  const { name, price, image, openModalWindow, _id, type } = props;
  const currentBun = useSelector((store) => store.burgerIngredients.bun);
  const buns = currentBun.slice(currentBun.length - 1);

  const countIngredients = useSelector(
    (store) =>
      store.burgerIngredients.ingredients.filter(
        (ingredient) => ingredient._id === _id
      ).length
  );
  const countBuns =
    buns.filter((ingredient) => ingredient._id === _id).length * 2;

  const amount = type === "bun" ? countBuns : countIngredients;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { props },
  });

  return (
    <li
      className={burgerIngredientStyles.burgerIngredient}
      onClick={openModalWindow}
      draggable
      ref={dragRef}
    >
      {amount !== 0 && (
        <Counter count={amount} size="default" extraClass="m-1" />
      )}
      <img src={image} alt={name} />

      <div className={burgerIngredientStyles.burgerIngredient__price}>
        <p className="text text_type_digits-default mt-1 mb-1">{price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p
        className={`text text_type_main-default pb-8 ${burgerIngredientStyles.burgerIngredient__title}`}
      >
        {name}
      </p>
    </li>
  );
};

BurgerIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  openModalWindow: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
