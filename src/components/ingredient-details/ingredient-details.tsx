/* Общие импорты */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TIngredient } from "../../services/types/types";
import { useAppSelector } from "../../hooks/customHooks";

/* Стили */
import styles from "./ingredient-details.module.scss";

/* Статичные строки */
const staticStrings = [
  "Детали ингредиента",
  "Калории, ккал",
  "Белки, г",
  "Жиры, г",
  "Углеводы, г",
];

const IngredientDetails = () => {
  const { id } = useParams();
  const [ingredient, setElement] = useState<TIngredient | null>(null);

  const ingredients = useAppSelector((store) => store.ingredients.data);

  useEffect(() => {
    const foundIngredient = ingredients
      ? ingredients.find((ing) => ing._id === id)
      : null;
    setElement(foundIngredient || null);
  }, [ingredients, id]);

  return ingredient ? (
    <div
      className={styles.ingredientDetails__container}
      data-cy="ingredient-details"
    >
      <div className={styles.ingredientDetails__header}>
        <h2 className="text text_type_main-large">{staticStrings[0]}</h2>
      </div>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mb-8 mt-4">{ingredient.name}</p>
      <div className={styles.ingredientDetails__composition}>
        <div className={styles.ingredientDetails__calories}>
          <p className="text text_type_main-small text_color_inactive">
            {staticStrings[1]}
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={styles.ingredientDetails__elements}>
          <p className="text text_type_main-small text_color_inactive">
            {staticStrings[2]}
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={styles.ingredientDetails__elements}>
          <p className="text text_type_main-small text_color_inactive">
            {staticStrings[3]}
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={styles.ingredientDetails__elements}>
          <p className="text text_type_main-small text_color_inactive">
            {staticStrings[4]}
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default IngredientDetails;
