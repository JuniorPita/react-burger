/* Общие импорты */
import { CLEAR_CONSTRUCTOR } from "./constructor-action";
import { requestForActions } from "./index";

/* Получение номера заказа */
export const GET_NUMBER_ORDER = "GET_NUMBER_ORDER";
export const GET_NUMBER_ORDER_SUCCESS = "GET_NUMBER_ORDER_SUCCESS";
export const GET_NUMBER_ORDER_FAILED = "GET_NUMBER_ORDER_FAILED";

const postData = (ingredients) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  };
};

export const pushOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: GET_NUMBER_ORDER,
    });
    requestForActions("orders", postData(ingredients))
      .then((res) => {
        dispatch({
          type: GET_NUMBER_ORDER_SUCCESS,
          order: res.order.number,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_NUMBER_ORDER_FAILED,
          error: err.message,
        });
      });
  };
};
