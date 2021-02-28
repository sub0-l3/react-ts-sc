import {
    ORDERS_AMOUNT_CHANGED,
    ORDERS_CURRENCY_PAIR_CHANGED,
    ORDERS_BOOK,
    ORDERS_BOOK_COMPLETED
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
            bookingResults: null
        };    
    },

    [ORDERS_BOOK_COMPLETED](state: OrdersState, bookingSuccess: boolean): OrdersState {
        console.log(`booking completed`);
        return {
            ...state,
            isBooking: false,
            bookingResults:bookingSuccess
        };   
    },
};