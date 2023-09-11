import { getCookie } from "../../utils/cookieFunction";
import {
  AppThunk,
  TConstructorIngredient,
  TIngredient,
  TOrder,
} from "../types/types";

export const GET_LIST_INGREDIENTS_REQUEST: "GET_LIST_INGREDIENTS_REQUEST" =
  "GET_LIST_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
export const GET_NUMBER_ORDER: "GET_NUMBER_ORDER" = "GET_NUMBER_ORDER";
export const GET_NUMBER_ORDER_SUCCESS: "GET_NUMBER_ORDER_SUCCESS" =
  "GET_NUMBER_ORDER_SUCCESS";
export const GET_NUMBER_ORDER_FAILED: "GET_NUMBER_ORDER_FAILED" =
  "GET_NUMBER_ORDER_FAILED";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const SELECT_INGREDIENT: "SELECT_INGREDIENT" = "SELECT_INGREDIENT";
export const DELETE_INFO_INGREDIENT: "DELETE_INFO_INGREDIENT" =
  "DELETE_INFO_INGREDIENT";

export const UrlAdress = "https://norma.nomoreparties.space/api";

export type TGetIngredientsRequest = {
  readonly type: typeof GET_LIST_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  data: TIngredient[] | null;
};

export type TGetIngredientsFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  error: string;
};

export type TGetNumberOrder = {
  readonly type: typeof GET_NUMBER_ORDER;
};

export type TGetNumberOrderSuccess = {
  readonly type: typeof GET_NUMBER_ORDER_SUCCESS;
  order: number;
};

export type TGetNumberOrderFailed = {
  readonly type: typeof GET_NUMBER_ORDER_FAILED;
  error: string;
};

export type TClearConstructor = {
  readonly type: typeof CLEAR_CONSTRUCTOR;
};

export type TSelectIngredient = {
  readonly type: typeof SELECT_INGREDIENT;
  data: TIngredient;
};

export type TDeleteInfoIngredient = {
  readonly type: typeof DELETE_INFO_INGREDIENT;
};

export type TAddIngredient = {
  readonly type: typeof ADD_INGREDIENT;
  data: TConstructorIngredient;
  uuid: string;
};

export type TAddBun = {
  readonly type: typeof ADD_BUN;
  data: TIngredient;
};

export type TDeleteIngredient = {
  readonly type: typeof DELETE_INGREDIENT;
  data: string;
};

export type TMoveIngredient = {
  readonly type: typeof MOVE_INGREDIENT;
  ingredients: TIngredient[];
  itemTo: number;
  itemFrom: number;
};

export type TServerResponse<T> = {
  success: boolean;
} & T;

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TSetOrderResponse = TServerResponse<{
  order: TOrder;
}>;

export const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
};

export const request = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${UrlAdress}/${url}`, options);
  return checkResponse<T>(res);
};

const dataPost = (ingredients: string[]) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  };
};

export const getIngredients: AppThunk<void> = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_INGREDIENTS_REQUEST,
    });
    request<TIngredientsResponse>("ingredients")
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

export const setOrder: AppThunk<void> = (ingredients: string[]) => {
  return (dispatch) => {
    dispatch({
      type: GET_NUMBER_ORDER,
    });
    request<TSetOrderResponse>("orders", dataPost(ingredients))
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

export const getDetailsIngredient = (
  ingredient: TIngredient
): TSelectIngredient => {
  return {
    type: SELECT_INGREDIENT,
    data: ingredient,
  };
};

export const deleteDetailsIngredient = (): TDeleteInfoIngredient => {
  return {
    type: DELETE_INFO_INGREDIENT,
  };
};

export type TGetIngredientsActions =
  | TGetIngredientsRequest
  | TGetIngredientsSuccess
  | TGetIngredientsFailed;
export type TGetNumberOrderActions =
  | TGetNumberOrder
  | TGetNumberOrderSuccess
  | TGetNumberOrderFailed
  | TClearConstructor;
export type TIngredientDetailsActions =
  | TSelectIngredient
  | TDeleteInfoIngredient;
export type TBurgerConstructorActions =
  | TAddIngredient
  | TAddBun
  | TDeleteIngredient
  | TMoveIngredient
  | TClearConstructor;
