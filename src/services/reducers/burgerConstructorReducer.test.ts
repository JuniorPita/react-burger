import { TBurgerConstructorState, burgerConstructorReducer } from "./burgerConstructorReducer";
import {
    ADD_INGREDIENT,
    ADD_BUN,
    DELETE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    TAddIngredient,
    TAddBun,
    TDeleteIngredient,
    TMoveIngredient,
    TClearConstructor
} from "../actions";
import { TConstructorIngredient, TIngredient } from "../types/types";

describe('Burger Constructor Reducer', () => {
    describe('Initial state', () => {
        it('Should return initial state', () => {
            const initialState = undefined;
            const action = {
                type: undefined
            };
            const expected = {
                ingredients: [],
                bun: [],
            } as TBurgerConstructorState;
    
            // Shut down type checking to simulate runtime error
            const result = burgerConstructorReducer(initialState, action as any);
    
            expect(result).toStrictEqual(expected);
        });
    
        it('Should not change the state', () => {
            const initialState = {
                ingredients: [],
                bun: [],
            } as TBurgerConstructorState;
            const action = {
                type: 'Some weird action'
            };
            const expected = {
                ingredients: [],
                bun: [],
            } as TBurgerConstructorState;
    
            // Shut down type checking to simulate runtime error
            const result = burgerConstructorReducer(initialState, action as any);
    
            expect(result).toStrictEqual(expected);
        });
    });
    
    describe(`Action [${ADD_INGREDIENT}]`, () => {
        it('Should add ingredient to state', () => {
            const initialState = {
                ingredients: [],
                bun: [],
            } as TBurgerConstructorState;
            const action = {
                type: ADD_INGREDIENT,
                data: {
                    _id: 'xyz',
                    name: 'Some ingredient'
                } as TConstructorIngredient,
                uuid: 'my uid'
            } as TAddIngredient;
            const expected = {
                ingredients: [
                    {
                        _id: 'xyz',
                        name: 'Some ingredient',
                        uuid: 'my uid'
                    } as TConstructorIngredient
                ],
                bun: [],
            } as TBurgerConstructorState;
    
            const result = burgerConstructorReducer(initialState, action);
    
            expect(result).toStrictEqual(expected);
        });
    });
    
    describe(`Action [${ADD_BUN}]`, () => {
        it('Should add bun to state', () => {
            const ingredient = {
                _id: 'xyz',
                name: 'Some ingredient'
            } as TIngredient;
            const initialState = {
                ingredients: [],
                bun: [],
            } as TBurgerConstructorState;
            const action = {
                type: ADD_BUN,
                data: ingredient
            } as TAddBun;
            const expected = {
                ingredients: [],
                bun: [ingredient],
            } as TBurgerConstructorState;
    
            const result = burgerConstructorReducer(initialState, action);
    
            expect(result).toStrictEqual(expected);
        });
    });
    
    describe(`Action [${DELETE_INGREDIENT}]`, () => {
        it('Should delete ingredient from state', () => {
            const ingredient = {
                _id: 'xyz',
                name: 'Some ingredient'
            } as TConstructorIngredient;
            const initialState = {
                ingredients: [ingredient],
                bun: [],
            } as TBurgerConstructorState;
            const action = {
                type: DELETE_INGREDIENT,
                data: ingredient._id
            } as TDeleteIngredient;
            const expected = {
                ingredients: [],
                bun: [],
            } as TBurgerConstructorState;
    
            const result = burgerConstructorReducer(initialState, action);
    
            expect(result).toStrictEqual(expected);
        });
    });
    
    describe(`Action [${MOVE_INGREDIENT}]`, () => {
        it('Should move ingredient from one position to another', () => {
            const initialState = {
                ingredients: [
                    {
                        _id: '1',
                        name: 'Some ingredient 1',
                    } as TConstructorIngredient,
                    {
                        _id: '2',
                        name: 'Some ingredient 2',
                    } as TConstructorIngredient,
                    {
                        _id: '3',
                        name: 'Some ingredient 3',
                    } as TConstructorIngredient,
                    {
                        _id: '4',
                        name: 'Some ingredient 4',
                    } as TConstructorIngredient,
                ],
                bun: [],
            } as TBurgerConstructorState;
            const action = {
                type: MOVE_INGREDIENT,
                itemFrom: 0,
                itemTo: 2
            } as TMoveIngredient;
            const expected = {
                ingredients: [
                    {
                        _id: '2',
                        name: 'Some ingredient 2',
                    } as TConstructorIngredient,
                    {
                        _id: '3',
                        name: 'Some ingredient 3',
                    } as TConstructorIngredient,
                    {
                        _id: '1',
                        name: 'Some ingredient 1',
                    } as TConstructorIngredient,
                    {
                        _id: '4',
                        name: 'Some ingredient 4',
                    } as TConstructorIngredient
                ],
                bun: [],
            } as TBurgerConstructorState;
    
            const result = burgerConstructorReducer(initialState, action);
    
            expect(result).toStrictEqual(expected);
        });
    });
    
    describe(`Action [${CLEAR_CONSTRUCTOR}]`, () => {
        it('Should clear the state', () => {
            const initialState = {
                ingredients: [
                    {
                        _id: '1',
                        name: 'Some ingredient 1',
                    } as TConstructorIngredient,
                    {
                        _id: '2',
                        name: 'Some ingredient 2',
                    } as TConstructorIngredient
                ],
                bun: [
                    {
                        _id: '3',
                        name: 'Some bun 1',
                    } as TIngredient,
                    {
                        _id: '4',
                        name: 'Some bun 2',
                    } as TIngredient,
                ]
            } as TBurgerConstructorState;
            const action = { type: CLEAR_CONSTRUCTOR } as TClearConstructor;
            const expected = {
                ingredients: [],
                bun: [],
            } as TBurgerConstructorState;
    
            const result = burgerConstructorReducer(initialState, action);
    
            expect(result).toStrictEqual(expected);
        });
    });
});
