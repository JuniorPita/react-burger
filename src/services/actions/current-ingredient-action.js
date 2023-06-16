/* Манипуляция с позициями */
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const DELETE_INFO_INGREDIENT = "DELETE_INFO_INGREDIENT";

export const getIngredientInfo = (ingredient) => {
  return {
    type: SELECT_INGREDIENT,
    data: ingredient,
  };
};

export const deleteIngredientInfo = () => {
  return {
    type: DELETE_INFO_INGREDIENT,
  };
};
