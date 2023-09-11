import { 
  WS_CONNECTION_CLOSED_USER, 
  WS_CONNECTION_ERROR_USER, 
  WS_CONNECTION_SUCCESS_USER,
  WS_GET_MESSAGE_USER,
  TWebSocketUserActions } from "../actions/websocket-user";
import { TOrder } from "../types/types";

type TWebSocketUserState = {
  wsConnected: boolean,
  orders: TOrder[],
}

const initialState: TWebSocketUserState = {
  wsConnected: false,
  orders: [],
};

export const wsFeedUserReducer = (state = initialState, action: TWebSocketUserActions): TWebSocketUserState => {
  switch(action.type) {
    case WS_CONNECTION_SUCCESS_USER: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR_USER: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED_USER: {
      return {
        ...state,
        wsConnected: false,
        orders: initialState.orders
      };
    }
    case WS_GET_MESSAGE_USER: {
      const orders = action.payload.orders.reverse()
      return {
        ...state,
        orders: orders,
      };
    }
    default: return state;
  }
}