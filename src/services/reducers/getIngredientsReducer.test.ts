import {
  TGetIngredientsState,
  getIngredientsReducer,
} from "./getIngredientsReducer";
import {
  GET_LIST_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TGetIngredientsRequest,
  TGetIngredientsSuccess,
  TGetIngredientsFailed,
} from "../actions";
import { TIngredient } from "../types/types";

describe("Get Ingredient Reducer", () => {
  describe("Initial state", () => {
    it("Should return initial state", () => {
      const initialState = undefined;
      const action = {
        type: undefined,
      };
      const expected = {
        data: [],
        loading: false,
      } as TGetIngredientsState;

      // Shut down type checking to simulate runtime error
      const result = getIngredientsReducer(initialState, action as any);

      expect(result).toStrictEqual(expected);
    });

    it("Should not change the state", () => {
      const initialState = {
        data: [],
        loading: false,
      } as TGetIngredientsState;
      const action = {
        type: "Some weird action",
      };
      const expected = {
        data: [],
        loading: false,
      } as TGetIngredientsState;

      // Shut down type checking to simulate runtime error
      const result = getIngredientsReducer(initialState, action as any);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${GET_LIST_INGREDIENTS_REQUEST}]`, () => {
    it("Should turn loading to true and keep the same state", () => {
      const initialState = {
        data: [
          {
            _id: "xyz",
            name: "Some ingredient",
          } as TIngredient,
        ],
        loading: false,
      } as TGetIngredientsState;
      const action = {
        type: GET_LIST_INGREDIENTS_REQUEST,
      } as TGetIngredientsRequest;
      const expected = {
        data: [
          {
            _id: "xyz",
            name: "Some ingredient",
          } as TIngredient,
        ],
        loading: true,
      } as TGetIngredientsState;

      const result = getIngredientsReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${GET_INGREDIENTS_SUCCESS}]`, () => {
    it("Should turn loading to false and update state with new data", () => {
      const initialState = {
        data: [
          {
            _id: "xyz",
            name: "Old ingredient",
          } as TIngredient,
        ],
        loading: true,
      } as TGetIngredientsState;
      const action = {
        type: GET_INGREDIENTS_SUCCESS,
        data: [
          {
            _id: "zyx",
            name: "New ingredient",
          } as TIngredient,
        ],
      } as TGetIngredientsSuccess;
      const expected = {
        data: [
          {
            _id: "zyx",
            name: "New ingredient",
          } as TIngredient,
        ],
        loading: false,
      } as TGetIngredientsState;

      const result = getIngredientsReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });

  describe(`Action [${GET_INGREDIENTS_FAILED}]`, () => {
    it("Should turn loading to false and keep old data in state", () => {
      const initialState = {
        data: [
          {
            _id: "xyz",
            name: "Old ingredient",
          } as TIngredient,
        ],
        loading: true,
      } as TGetIngredientsState;
      const action = {
        type: GET_INGREDIENTS_FAILED,
        error: "Cannot add ingredient",
      } as TGetIngredientsFailed;
      const expected = {
        data: [
          {
            _id: "xyz",
            name: "Old ingredient",
          } as TIngredient,
        ],
        loading: false,
      } as TGetIngredientsState;

      const result = getIngredientsReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });
});
