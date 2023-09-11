import styles from "./ingredients.module.scss";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

function IngredientsPage() {
  return (
    <div className={styles.container}>
      <IngredientDetails />
    </div>
  );
}

export default IngredientsPage;
