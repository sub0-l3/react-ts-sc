import {OrdersService} from "../../services/ordersService";
import { ORDERS_BOOK, ORDERS_BOOK_COMPLETED } from "../store/actions"
const ordersService = new OrdersService();

export const SideEffects = {
    [ORDERS_BOOK](state: any, onDone: (doneAction: string, ...args: any) => void) {
        console.log(`booking`);
        let responseHandler = (success: Boolean) => onDone(ORDERS_BOOK_COMPLETED, success)
        ordersService.book(state.currencyPair, state.amount, responseHandler) 
    },
};