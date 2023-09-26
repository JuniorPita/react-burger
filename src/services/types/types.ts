/* Общие импорты */
import { Action, ActionCreator } from "redux";
import { ReactElement } from "react";
import { ThunkAction } from "redux-thunk";
import store from "../store";
import {
  TBurgerConstructorActions,
  TGetIngredientsActions,
  TGetNumberOrderActions,
  TIngredientDetailsActions,
} from "../actions";
import {
  TGetUserActions,
  TLoginActions,
  TLogoutActions,
  TPatchUserActions,
  TRegisterUserActions,
  TResetPasswordActions,
  TRestorePasswordActions,
  TUpdateTokenActions,
} from "../actions/user";
import { TWebSocketActions } from "../actions/websocket-base";
import { TWebSocketUserActions } from "../actions/websocket-for-user";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
  index?: number;
  ingredient: TIngredient;
  uuid?: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updateAt: string;
  _id: string;
};

export type TwsActions = {
  wsStart: "WS_CONNECTION_START" | "WS_CONNECTION_START_USER";
  wsClose: "WS_CLOSE_CONNECTION" | "WS_CLOSE_CONNECTION_USER";
  onOpen: "WS_CONNECTION_SUCCESS" | "WS_CONNECTION_SUCCESS_USER";
  onClose: "WS_CONNECTION_CLOSED" | "WS_CONNECTION_CLOSED_USER";
  onError: "WS_CONNECTION_ERROR" | "WS_CONNECTION_ERROR_USER";
  onMessage: "WS_GET_MESSAGE" | "WS_GET_MESSAGE_USER";
};

export type TModal = {
  children: ReactElement;
  onClosePopup: () => void;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type TApplicationActions =
  | TGetIngredientsActions
  | TGetNumberOrderActions
  | TIngredientDetailsActions
  | TBurgerConstructorActions
  | TRestorePasswordActions
  | TRegisterUserActions
  | TResetPasswordActions
  | TLoginActions
  | TUpdateTokenActions
  | TGetUserActions
  | TLogoutActions
  | TPatchUserActions
  | TWebSocketActions
  | TWebSocketUserActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, Action, TApplicationActions>
>;
