import ingredientDetailsStyles from "./ingredient-details.module.scss";
import PropTypes from "prop-types";

const IngredientDetails = ({ currentElement }) => {
  const descriptionTitles = {
    calories: "Калории, ккал",
    proteins: "Белки, г",
    fat: "Жиры, г",
    carbohydrates: "Углеводы, г",
  };

  return (
    <section className={ingredientDetailsStyles.ingredientDetails}>
      <div className={ingredientDetailsStyles.ingredientDetails__header}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>

      <img src={currentElement.image_large} alt={currentElement.name} />
      <span className="text text_type_main-medium mb-8 mt-4">
        {currentElement.name}
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
            {currentElement.calories}
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
            {currentElement.proteins}
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
            {currentElement.fat}
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
            {currentElement.carbohydrates}
          </span>
        </div>
      </div>
    </section>
  );
};

IngredientDetails.propTypes = {
  currentElement: PropTypes.object.isRequired,
};

export default IngredientDetails;
