/* Общие импорты */
import {
  GET_NUMBER_ORDER,
  GET_NUMBER_ORDER_SUCCESS,
  GET_NUMBER_ORDER_FAILED,
} from "../actions";

const baseState = {
  order: 0,
  loading: false,
  failed: false,
};

export const orderReducer = (state = baseState, action) => {
  switch (action.type) {
    case GET_NUMBER_ORDER: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_NUMBER_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        order: action.order,
      };
    }
    case GET_NUMBER_ORDER_FAILED: {
      return {
        ...state,
        loading: true,
        failed: true,
      };
    }
    default:
      return state;
  }
};
