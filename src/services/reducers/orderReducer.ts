/* Общие импорты */
import {
  GET_NUMBER_ORDER,
  GET_NUMBER_ORDER_SUCCESS,
  GET_NUMBER_ORDER_FAILED,
  TGetNumberOrderActions,
} from "../actions";

type TGetNumberOrderState = {
  order: number;
  loading: boolean;
  failed: boolean;
};

const initialState: TGetNumberOrderState = {
  order: 0,
  loading: false,
  failed: false,
};

export const orderReducer = (
  state = initialState,
  action: TGetNumberOrderActions
): TGetNumberOrderState => {
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
        loading: false,
        failed: true,
      };
    }
    default:
      return state;
  }
};
