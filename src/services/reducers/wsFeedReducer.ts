import {
  WS_CONNECTION_SUCCESS, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWebSocketActions
} from "../actions/websocket";
import { TOrder } from "../types/types";

type TWebSocketState = {
  wsConnected: boolean,
  orders: TOrder[],
  total: number,
  totalToday: number,
}

const initialState: TWebSocketState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0
}

export const wsFeedReducer = (state = initialState, action: TWebSocketActions): TWebSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        orders: initialState.orders,
        wsConnected: false
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    default: return state;
  }
}