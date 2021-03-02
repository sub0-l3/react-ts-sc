import {OrdersService} from "../../services/ordersService";
import { ORDERS_BOOK, ORDERS_BOOK_SUCCESS, ORDERS_BOOK_ERROR } from "../store/actions"
const ordersService = new OrdersService();

export const SideEffects = {
    [ORDERS_BOOK](state: any, onDone: (doneAction: string, ...args: any) => void) {
        console.log(`booking`);
        const responseHandler = (isSuccess: Boolean) => {
            if (isSuccess)
             return onDone(ORDERS_BOOK_SUCCESS, {ok: true})
            else
             return  onDone(ORDERS_BOOK_ERROR, {ok: false, data: 
                {"errorCode": 400,
                "errorMessage": "Amount should be 1m"}})
        }
        ordersService.book(state.currencyPair, state.amount, responseHandler) 
    },
};