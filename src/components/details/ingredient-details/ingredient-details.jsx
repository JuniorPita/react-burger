/* Общие импорты */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

/* Стили */
import ingredientDetailsStyles from "./ingredient-details.module.scss";

/* Статичные строки */
const descriptionTitles = {
  calories: "Калории, ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

const IngredientDetails = () => {
  const { id } = useParams();
  const [ingredient, setElement] = useState(undefined);
  const ingredients = useSelector((store) => store.ingredients.data);

  useEffect(() => {
    setElement(ingredients.find((ingredient) => ingredient._id === id));
  }, [ingredients]);

  return ingredient ? (
    <section className={ingredientDetailsStyles.ingredientDetails}>
      <div className={ingredientDetailsStyles.ingredientDetails__header}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>

      <img src={ingredient.image_large} alt={ingredient.name} />
      <span className="text text_type_main-medium mb-8 mt-4">
        {ingredient.name}
      </span>

      <div className={ingredientDetailsStyles.ingredientDetails__description}>
        <div
          className={
            ingredientDetailsStyles.ingredientDetails__description_item
          }
        >
          <span className="text text_type_main-small text_color_inactive">
            {descriptionTitles.calories}
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </span>
        </div>

        <div
          className={
            ingredientDetailsStyles.ingredientDetails__description_item
          }
        >
          <span className="text text_type_main-small text_color_inactive">
            {descriptionTitles.proteins}
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </span>
        </div>

        <div
          className={
            ingredientDetailsStyles.ingredientDetails__description_item
          }
        >
          <span className="text text_type_main-small text_color_inactive">
            {descriptionTitles.fat}
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </span>
        </div>

        <div
          className={
            ingredientDetailsStyles.ingredientDetails__description_item
          }
        >
          <span className="text text_type_main-small text_color_inactive">
            {descriptionTitles.carbohydrates}
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </section>
  ) : null;
};

export default IngredientDetails;
