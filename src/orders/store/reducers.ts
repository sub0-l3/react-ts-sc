import {
    ORDERS_AMOUNT_CHANGED,
    ORDERS_CURRENCY_PAIR_CHANGED,
    ORDERS_BOOK,
    ORDERS_BOOK_SUCCESS,
    ORDERS_BOOK_ERROR
  } from './actions';

export const Reducers = {
    [ORDERS_AMOUNT_CHANGED](state: OrdersState, amount: string): OrdersState {
        console.log(`Amount changed from ${state.amount} to ${amount}`);
        return {
            ...state,
            amount
        };
    },

    [ORDERS_CURRENCY_PAIR_CHANGED](state: OrdersState, currencyPair: string): OrdersState {
        console.log(`currencyPair changed from ${state.currencyPair} to ${currencyPair}`);
        return {
            ...state,
            currencyPair
        };
    },

    [ORDERS_BOOK](state: OrdersState): OrdersState {
        console.log(`booking`);
        return {
            ...state,
            isBooking:true,
            bookingResults: null,
            bookingError: null
        };    
    },

    [ORDERS_BOOK_SUCCESS](state: OrdersState, payload: payloadSuccess): OrdersState {
        console.log(`booking Sucess`);
        return {
            ...state,
            isBooking: false,
            bookingResults:payload.ok
        };   
    },

    [ORDERS_BOOK_ERROR](state: OrdersState, payload: payloadError): OrdersState {
        console.log(`booking Error`);
        return {
            ...state,
            isBooking: false,
            bookingResults:payload.ok,
            bookingError: payload.data.errorMessage
        };   
    },
};