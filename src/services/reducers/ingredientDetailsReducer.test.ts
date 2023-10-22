import { TIngredientDetailsState, ingredientDetailsReducer } from "./ingredientDetailsReducer";
import {
    SELECT_INGREDIENT,
    DELETE_INFO_INGREDIENT,
    TSelectIngredient,
    TDeleteInfoIngredient
} from "../actions";
import { TIngredient } from "../types/types";

describe('Ingredient Details Reducer', () => {
    describe('Initial state', () => {
        it('Should return initial state', () => {
            const initialState = undefined;
            const action = {
                type: undefined
            };
            const expected = {
                selectedIngredient: {
                    data: null
                }
            } as TIngredientDetailsState;
    
            // Shut down type checking to simulate runtime error
            const result = ingredientDetailsReducer(initialState, action as any);
    
            expect(result).toStrictEqual(expected);
        });
    
        it('Should not change the state', () => {
            const initialState = {
                selectedIngredient: { data: null }
            } as TIngredientDetailsState;
            const action = {
                type: 'Some weird action'
            };
            const expected = {
                selectedIngredient: { data: null }
            } as TIngredientDetailsState;
    
            // Shut down type checking to simulate runtime error
            const result = ingredientDetailsReducer(initialState, action as any);
    
            expect(result).toStrictEqual(expected);
        });
    });
    
    describe(`Action [${SELECT_INGREDIENT}]`, () => {
        it('Should add selected ingredient info to state', () => {
            const initialState = {
                selectedIngredient: { data: null }
            } as TIngredientDetailsState;
            const action = {
                type: SELECT_INGREDIENT,
                data: {
                    _id: 'xyz',
                    name: 'Some ingredient'
                } as TIngredient
            } as TSelectIngredient;
            const expected = {
                selectedIngredient: {
                    data: null,
                    _id: 'xyz',
                    name: 'Some ingredient'
                }
            } as TIngredientDetailsState;
    
            const result = ingredientDetailsReducer(initialState, action);
    
            expect(result).toStrictEqual(expected);
        });
    });
    
    describe(`Action [${DELETE_INFO_INGREDIENT}]`, () => {
        it('Should remove selected ingredient info from state', () => {
            const initialState = {
                selectedIngredient: {
                    data: null,
                    _id: 'xyz',
                    name: 'Some ingredient'
                }
            } as TIngredientDetailsState;
            const action = {
                type: DELETE_INFO_INGREDIENT
            } as TDeleteInfoIngredient;
            const expected = {
                selectedIngredient: {
                    data: null
                }
            } as TIngredientDetailsState;
    
            const result = ingredientDetailsReducer(initialState, action);
    
            expect(result).toStrictEqual(expected);
        });
    });
});
