import { SELECT_INGREDIENT, DELETE_INFO_INGREDIENT, TIngredientDetailsActions } from "../actions";
import { TIngredient } from "../types/types";

type TIngredientDetailsState = {
  selectedIngredient: {data: TIngredient | null},
}


const initialState: TIngredientDetailsState = {
  selectedIngredient: {data: null},
}

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions): TIngredientDetailsState => {
  switch(action.type) {
     case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: { ...state.selectedIngredient, ...action.data }
      };
     }
     case DELETE_INFO_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: {data: null},
      };
     }
    default: return state;
  }
}