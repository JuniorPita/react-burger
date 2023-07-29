/* Общие импорты */
import { combineReducers } from "redux";

/* Редьюсеры */
import { getIngredientsReducer } from "../reducers/get-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderReducer } from "./order";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  burgerIngredients: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderNumber: orderReducer,
  user: userReducer,
});
