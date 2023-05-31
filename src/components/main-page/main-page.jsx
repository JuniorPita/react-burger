import mainPageStyles from "./main-page.module.scss";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import PropTypes from "prop-types";
import IngredientPropTypes from "../../utils/Ingredient-prop-types";

const MainPage = ({ elements }) => {
  return (
    <main className={mainPageStyles.mainPage}>
      <BurgerIngredients elements={elements} />
      <BurgerConstructor elements={elements} />
    </main>
  );
};

MainPage.propTypes = {
  elements: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired,
};

export default MainPage;
