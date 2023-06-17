/* Общие импорты */
import {
  SELECT_INGREDIENT,
  DELETE_INFO_INGREDIENT,
} from "../actions/current-ingredient-action";

const baseState = {
  selectedIngredient: {},
};

export const ingredientDetailsReducer = (state = baseState, action) => {
  switch (action.type) {
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: { ...state.selectedIngredient, ...action.data },
      };
    }
    case DELETE_INFO_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: {},
      };
    }
    default:
      return state;
  }
};
