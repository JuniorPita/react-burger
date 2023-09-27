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
import {
  TWebSocketActions,
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/webSocketBase";
import {
  TWebSocketUserActions,
  WS_CLOSE_CONNECTION_USER,
  WS_CONNECTION_CLOSED_USER,
  WS_CONNECTION_ERROR_USER,
  WS_CONNECTION_START_USER,
  WS_CONNECTION_SUCCESS_USER,
  WS_GET_MESSAGE_USER,
} from "../actions/webSocketUser";

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
  wsStart: typeof WS_CONNECTION_START | typeof WS_CONNECTION_START_USER;
  wsClose: typeof WS_CLOSE_CONNECTION | typeof WS_CLOSE_CONNECTION_USER;
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_SUCCESS_USER;
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED_USER;
  onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_ERROR_USER;
  onMessage: typeof WS_GET_MESSAGE | typeof WS_GET_MESSAGE_USER;
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
