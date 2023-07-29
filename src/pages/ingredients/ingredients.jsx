/* Стили */
import ingredientsPageStyles from "./ingredients.module.scss";

/* Компоненты */
import IngredientDetails from "../../components/details/ingredient-details/ingredient-details";

const IngredientsPage = () => {
  return (
    <div className={ingredientsPageStyles.ingredientsPage}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientsPage;
