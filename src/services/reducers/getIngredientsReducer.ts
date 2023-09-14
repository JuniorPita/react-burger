/* Общие импорты */
import {
  GET_LIST_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TGetIngredientsActions,
} from "../actions";
import { TIngredient } from "../types/types";

type TGetIngredientsState = {
  data: Array<TIngredient> | null;
  loading: boolean;
};

const initialState: TGetIngredientsState = {
  data: [],
  loading: false,
};

export const getIngredientsReducer = (
  state = initialState,
  action: TGetIngredientsActions
): TGetIngredientsState => {
  switch (action.type) {
    case GET_LIST_INGREDIENTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        loading: false,
        data: state.data,
      };
    }
    default:
      return state;
  }
};
