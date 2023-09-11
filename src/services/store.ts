import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socketMiddleWare";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CLOSE_CONNECTION,
} from "./actions/websocket";
import {
  WS_CLOSE_CONNECTION_USER,
  WS_CONNECTION_CLOSED_USER,
  WS_CONNECTION_ERROR_USER,
  WS_CONNECTION_START_USER,
  WS_CONNECTION_SUCCESS_USER,
  WS_GET_MESSAGE_USER,
} from "./actions/websocket-user";

const wsActions = {
  wsStart: WS_CONNECTION_START,
  wsClose: WS_CLOSE_CONNECTION,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const wsActionsUser = {
  wsStart: WS_CONNECTION_START_USER,
  wsClose: WS_CLOSE_CONNECTION_USER,
  onOpen: WS_CONNECTION_SUCCESS_USER,
  onClose: WS_CONNECTION_CLOSED_USER,
  onError: WS_CONNECTION_ERROR_USER,
  onMessage: WS_GET_MESSAGE_USER,
};

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsUserUrl = "wss://norma.nomoreparties.space/orders";

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(wsUrl, wsActions),
      socketMiddleware(wsUserUrl, wsActionsUser)
    )
  )
);

export default store;
