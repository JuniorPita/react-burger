/* Общие импорты */
import { requestForActions } from "./index";

/* Получение ингредиентов */
export const GET_LIST_INGREDIENTS_REQUEST = "GET_LIST_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_INGREDIENTS_REQUEST,
    });
    requestForActions("ingredients")
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: err.message,
        });
      });
  };
};
