import {
    ORDERS_AMOUNT_CHANGED,
    ORDERS_CURRENCY_PAIR_CHANGED,
    ORDERS_BOOK,
    ORDERS_BOOK_SUCCESS,
    ORDERS_BOOK_ERROR
  } from './actions';
  import {currencyPairs} from '../../lib/constants';

  import { Reducers } from './reducers';
  
  describe('Orders store reducers', () => {
    let initialState: OrdersState;
  
    beforeEach(() => {
      initialState = {
        amount: '1m',
        currencyPair: currencyPairs.USDGBP,
        isBooking: false,
        bookingResults: null,
        bookingError: null
      };
    });
  
    it('ORDERS_AMOUNT_CHANGED should update amount in state', () => {
      expect(Reducers[ORDERS_AMOUNT_CHANGED](initialState, '2m')).toEqual({
        ...initialState,
        amount: '2m',
      });
      expect(Reducers[ORDERS_AMOUNT_CHANGED](initialState, '')).toEqual({
        ...initialState,
        amount: '',
      });
    });
  
    it('ORDERS_CURRENCY_PAIR_CHANGED action should update currencyPair field in state', () => {
      expect(
        Reducers[ORDERS_CURRENCY_PAIR_CHANGED](initialState, currencyPairs.EURUSD),
      ).toEqual({
        ...initialState,
        currencyPair: currencyPairs.EURUSD,
      });
    });
  
    it('ORDERS_BOOK action should set isBooking to true', () => {
      expect(Reducers[ORDERS_BOOK](initialState)).toEqual({
        ...initialState,
        isBooking: true,
        bookingResults: null,
        bookingError: null
      });
    });

    it('ORDERS_BOOK_SUCCESS action should set bookingResults to true in state', () => {
      expect(Reducers[ORDERS_BOOK_SUCCESS](initialState, {ok: true})).toEqual({
        ...initialState,
        bookingResults: true,
        isBooking: false
      });
    });

    it('ORDERS_BOOK_ERROR action should set bookingResults to false and set proper error Message in state', () => {
      const errMsg = "something went wrong"
      expect(Reducers[ORDERS_BOOK_ERROR](initialState, {ok: false, data: { errorMessage: errMsg}})).toEqual({
        ...initialState,
        bookingResults: false,
        bookingError: errMsg,
        isBooking: false
      });
    });
  });