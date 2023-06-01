import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientStyles from "./burger-ingredient.module.scss";
import PropTypes from "prop-types";

const BurgerIngredient = ({ name, price, image, openModalWindow }) => {
  return (
    <li
      className={burgerIngredientStyles.burgerIngredient}
      onClick={openModalWindow}
    >
      <Counter count={1} size="default" extraClass="m-1" />
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
};

export default BurgerIngredient;
