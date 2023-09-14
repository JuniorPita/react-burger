/* Общие импорты */
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

/* Стили */
import styles from "./ingredients.module.scss";

const IngredientsPage = () => {
  return (
    <div className={styles.ingredients__container}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientsPage;
