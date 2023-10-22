import {
    TWsConnectionUserEClosed,
    TWsConnectionUserError,
    TWsConnectionUserSuccess,
    TWsGetMessageUser,
    TWsUserPayload,
    WS_CONNECTION_CLOSED_USER,
    WS_CONNECTION_ERROR_USER,
    WS_CONNECTION_SUCCESS_USER,
    WS_GET_MESSAGE_USER
} from "../actions/webSocketUser";
import { TOrder } from "../types/types";
import { TWebSocketUserState, wsFeedUserReducer } from "./webSocketFeedUserReducer";

describe('Web Socket Feed User Reducer', () => {
    describe('Initial state', () => {
        it('Should return initial state', () => {
            const initialState = undefined;
            const action = {
                type: undefined
            };
            const expected = {
                wsConnected: false,
                orders: []
            } as TWebSocketUserState;

            // Shut down type checking to simulate runtime error
            const result = wsFeedUserReducer(initialState, action as any);
    
            expect(result).toStrictEqual(expected);
        });

        it('Should not change the state', () => {
            const initialState = {
                wsConnected: false,
                orders: []
            } as TWebSocketUserState;
            const action = {
                type: 'Some weird action'
            };
            const expected = {
                wsConnected: false,
                orders: []
            } as TWebSocketUserState;

            // Shut down type checking to simulate runtime error
            const result = wsFeedUserReducer(initialState, action as any);
    
            expect(result).toStrictEqual(expected);
        });
    });

    describe(`Action [${WS_CONNECTION_SUCCESS_USER}]`, () => {
        it('Should set wsConnected to true', () => {
            const initialState = {
                wsConnected: false,
                orders: []
            } as TWebSocketUserState;
            const action = {
                type: WS_CONNECTION_SUCCESS_USER
            } as TWsConnectionUserSuccess;
            const expected = {
                wsConnected: true,
                orders: []
            } as TWebSocketUserState;

            const result = wsFeedUserReducer(initialState, action);

            expect(result).toStrictEqual(expected);
        });
    });

    describe(`Action [${WS_CONNECTION_ERROR_USER}]`, () => {
        it('Should set wsConnected to false', () => {
            const initialState = {
                wsConnected: true,
                orders: []
            } as TWebSocketUserState;
            const action = {
                type: WS_CONNECTION_ERROR_USER
            } as TWsConnectionUserError;
            const expected = {
                wsConnected: false,
                orders: []
            } as TWebSocketUserState;

            const result = wsFeedUserReducer(initialState, action);

            expect(result).toStrictEqual(expected);
        });
    });

    describe(`Action [${WS_CONNECTION_CLOSED_USER}]`, () => {
        it('Should set wsConnected to false and set orders to initial state', () => {
            const initialState = {
                wsConnected: true,
                orders: [
                    {
                        _id: 'xyz',
                        name: 'some order'
                    } as TOrder
                ]
            } as TWebSocketUserState;
            const action = {
                type: WS_CONNECTION_CLOSED_USER
            } as TWsConnectionUserEClosed;
            const expected = {
                wsConnected: false,
                orders: []
            } as TWebSocketUserState;

            const result = wsFeedUserReducer(initialState, action);

            expect(result).toStrictEqual(expected);
        });
    });

    describe(`Action [${WS_GET_MESSAGE_USER}]`, () => {
        it('Should set orders from payload to state and reverse them', () => {
            const initialState = {
                wsConnected: true,
                orders: []
            } as TWebSocketUserState;
            const action = {
                type: WS_GET_MESSAGE_USER,
                payload: {
                    orders: [
                        {
                            _id: '1',
                            name: 'some order 1'
                        } as TOrder,
                        {
                            _id: '2',
                            name: 'some order 2'
                        } as TOrder
                    ]
                } as TWsUserPayload
            } as TWsGetMessageUser;
            const expected = {
                wsConnected: true,
                orders: [
                    {
                        _id: '2',
                        name: 'some order 2'
                    } as TOrder,
                    {
                        _id: '1',
                        name: 'some order 1'
                    } as TOrder
                ]
            } as TWebSocketUserState;

            const result = wsFeedUserReducer(initialState, action);

            expect(result).toStrictEqual(expected);
        });
    });
});
