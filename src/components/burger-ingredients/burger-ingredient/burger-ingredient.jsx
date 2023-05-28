import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientStyles from "./burger-ingredient.module.scss";
import PropTypes from "prop-types";

const BurgerIngredient = ({ name, price, image }) => {
  return (
    <li className={burgerIngredientStyles.element}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={image} alt={name} />

      <div className={burgerIngredientStyles.price}>
        <p className="text text_type_digits-default mt-1 mb-1">{price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p
        className={`text text_type_main-default pb-8 ${burgerIngredientStyles.title}`}
      >
        {name}
      </p>
    </li>
  );
};

BurgerIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
}.isRequired;

export default BurgerIngredient;
