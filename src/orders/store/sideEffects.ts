import {OrdersService} from "../services/ordersService";

const ordersService = new OrdersService();

export const SideEffects = {
    book(state: any, onDone: (doneAction: string, ...args: any) => void) {
        console.log(`booking`);
        let resultsHandler = (success: Boolean) => onDone('bookingComplete', success)
        ordersService.book(state.currencyPair, state.amount, resultsHandler) 
    },
};