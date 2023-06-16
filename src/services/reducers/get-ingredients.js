/* Общие импорты */
import {
  GET_LIST_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions";

const baseState = {
  data: [],
  loading: false,
};

export const getIngredientsReducer = (state = baseState, action) => {
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
