import {Store} from '../../infrastructure/store';
import {Reducers} from '../store/reducers';
import {SideEffects} from '../store/sideEffects';
import {currencyPairs} from '../../lib/constants';

export const createStore = (onUpdate: (state:OrdersState)=> void) => {

    const initialState: OrdersState = {
        amount: '1m',
        currencyPair: currencyPairs.USDGBP,
        isBooking: false,
        bookingResults: null,
        bookingError: null
    };
    const store = new Store(
        initialState,
        Reducers,
        SideEffects,
        onUpdate
    );
    return store
}
