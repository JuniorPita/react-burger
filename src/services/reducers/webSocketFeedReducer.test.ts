import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWsConnectionSuccess,
  TWsConnectionError,
  TWsConnectionClosed,
  TWsGetMessage,
  TWsPayload,
} from "../actions/webSocketBase";
import { TOrder } from "../types/types";
import { TWebSocketState, wsFeedReducer } from "./webSocketFeedReducer";

describe("Web Socket Feed Reducer", () => {
  describe("Initial state", () => {
    it("Should return initial state", () => {
      const initialState = undefined;
      const action = {
        type: undefined,
      };
      const expected = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
      } as TWebSocketState;

      // Shut down type checking to simulate runtime error
      const result = wsFeedReducer(initialState, action as any);

      expect(result).toStrictEqual(expected);
    });

    it("Should not change the state", () => {
      const initialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
      } as TWebSocketState;
      const action = {
        type: "Some weird action",
      };
      const expected = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
      } as TWebSocketState;

      // Shut down type checking to simulate runtime error
      const result = wsFeedReducer(initialState, action as any);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${WS_CONNECTION_SUCCESS}]`, () => {
    it("Should set wsConnected to true", () => {
      const initialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
      } as TWebSocketState;
      const action = {
        type: WS_CONNECTION_SUCCESS,
      } as TWsConnectionSuccess;
      const expected = {
        wsConnected: true,
        orders: [],
        total: 0,
        totalToday: 0,
      } as TWebSocketState;

      const result = wsFeedReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${WS_CONNECTION_ERROR}]`, () => {
    it("Should set wsConnected to false", () => {
      const initialState = {
        wsConnected: true,
        orders: [],
        total: 0,
        totalToday: 0,
      } as TWebSocketState;
      const action = {
        type: WS_CONNECTION_ERROR,
      } as TWsConnectionError;
      const expected = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
      } as TWebSocketState;

      const result = wsFeedReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${WS_CONNECTION_CLOSED}]`, () => {
    it("Should set wsConnected to false and set orders to initial state", () => {
      const initialState = {
        wsConnected: true,
        orders: [
          {
            _id: "xyz",
            name: "some order",
          } as TOrder,
        ],
        total: 1,
        totalToday: 1,
      } as TWebSocketState;
      const action = {
        type: WS_CONNECTION_CLOSED,
      } as TWsConnectionClosed;
      const expected = {
        wsConnected: false,
        orders: [],
        total: 1,
        totalToday: 1,
      } as TWebSocketState;

      const result = wsFeedReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${WS_GET_MESSAGE}]`, () => {
    it("Should set payload data to state", () => {
      const initialState = {
        wsConnected: true,
        orders: [],
        total: 0,
        totalToday: 0,
      } as TWebSocketState;
      const action = {
        type: WS_GET_MESSAGE,
        payload: {
          orders: [
            {
              _id: "xyz",
              name: "some order",
            } as TOrder,
          ],
          total: 1,
          totalToday: 30,
        } as TWsPayload,
      } as TWsGetMessage;
      const expected = {
        wsConnected: true,
        orders: [
          {
            _id: "xyz",
            name: "some order",
          } as TOrder,
        ],
        total: 1,
        totalToday: 30,
      } as TWebSocketState;

      const result = wsFeedReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });
});
