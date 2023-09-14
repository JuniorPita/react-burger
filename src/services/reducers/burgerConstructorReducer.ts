/* Общие импорты */
import {
  ADD_INGREDIENT,
  ADD_BUN,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  TBurgerConstructorActions,
} from "../actions";
import { TConstructorIngredient, TIngredient } from "../types/types";

type TBurgerConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TIngredient[];
};

const initialState: TBurgerConstructorState = {
  ingredients: [],
  bun: [],
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          { ...action.data, uuid: action.uuid },
        ],
      };
    }
    case ADD_BUN: {
      const bun: TIngredient = action.data;
      return {
        ...state,
        bun: [...state.bun, bun],
      };
    }
    case DELETE_INGREDIENT: {
      const newIngredientsState = { ...state };
      const indexIngredient = newIngredientsState.ingredients.findIndex(
        (item) => item._id === action.data
      );
      if (indexIngredient !== -1) {
        newIngredientsState.ingredients.splice(indexIngredient, 1);
      }
      return {
        ...state,
        ingredients: [...newIngredientsState.ingredients],
      };
    }
    case MOVE_INGREDIENT: {
      const newIngredients = [...state.ingredients];
      newIngredients.splice(
        action.itemTo,
        0,
        newIngredients.splice(action.itemFrom, 1)[0]
      );
      return {
        ...state,
        ingredients: newIngredients,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [],
        bun: [],
      };
    }
    default:
      return state;
  }
};
