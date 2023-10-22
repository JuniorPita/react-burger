import {
  GET_NUMBER_ORDER,
  GET_NUMBER_ORDER_SUCCESS,
  GET_NUMBER_ORDER_FAILED,
  TGetNumberOrder,
  TGetNumberOrderSuccess,
  TGetNumberOrderFailed,
} from "../actions";
import { TGetNumberOrderState, orderReducer } from "./orderReducer";

describe("Order Reducer", () => {
  describe("Initial state", () => {
    it("Should return initial state", () => {
      const initialState = undefined;
      const action = {
        type: undefined,
      };
      const expected = {
        order: 0,
        loading: false,
        failed: false,
      } as TGetNumberOrderState;

      // Shut down type checking to simulate runtime error
      const result = orderReducer(initialState, action as any);

      expect(result).toStrictEqual(expected);
    });

    it("Should not change the state", () => {
      const initialState = {
        order: 0,
        loading: false,
        failed: false,
      } as TGetNumberOrderState;
      const action = {
        type: "Some weird action",
      };
      const expected = {
        order: 0,
        loading: false,
        failed: false,
      } as TGetNumberOrderState;

      // Shut down type checking to simulate runtime error
      const result = orderReducer(initialState, action as any);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${GET_NUMBER_ORDER}]`, () => {
    it("Should set loading to true", () => {
      const initialState = {
        order: 1234,
        loading: false,
        failed: false,
      } as TGetNumberOrderState;
      const action = {
        type: GET_NUMBER_ORDER,
      } as TGetNumberOrder;
      const expected = {
        order: 1234,
        loading: true,
        failed: false,
      } as TGetNumberOrderState;

      const result = orderReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${GET_NUMBER_ORDER_SUCCESS}]`, () => {
    it("Should set loading to false and update order with new number", () => {
      const initialState = {
        order: 1234,
        loading: true,
        failed: false,
      } as TGetNumberOrderState;
      const action = {
        type: GET_NUMBER_ORDER_SUCCESS,
        order: 5678,
      } as TGetNumberOrderSuccess;
      const expected = {
        order: 5678,
        loading: false,
        failed: false,
      } as TGetNumberOrderState;

      const result = orderReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${GET_NUMBER_ORDER_FAILED}]`, () => {
    it("Should set loading to false and set failed to true", () => {
      const initialState = {
        order: 1234,
        loading: true,
        failed: false,
      } as TGetNumberOrderState;
      const action = {
        type: GET_NUMBER_ORDER_FAILED,
      } as TGetNumberOrderFailed;
      const expected = {
        order: 1234,
        loading: false,
        failed: true,
      } as TGetNumberOrderState;

      const result = orderReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });
});
