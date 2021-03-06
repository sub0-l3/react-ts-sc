import * as React from 'react';
import {Store} from '../../infrastructure/store';
import { createStore } from '../store/create'
import {
    ORDERS_AMOUNT_CHANGED,
    ORDERS_CURRENCY_PAIR_CHANGED,
    ORDERS_BOOK
  } from '../store/actions';
import Button from '../../components/Button';
import {currencyPairs, orderNotifications} from '../../lib/constants';
export default class OrdersView extends React.Component<Object, OrdersState> {
    private store: Store<OrdersState>;

    constructor(props: Object) {
        super(props);

        this.store = createStore(
            (nextState: OrdersState) => this.setState(nextState)
        );

        // set initial state
        this.state = this.store.currentState;
    }

    onAmountChanged = (amount: string) => {
        this.store.dispatchAction(ORDERS_AMOUNT_CHANGED, amount);
    };

    onCurrencyPairChanged = (ccyPair: string) => {
        this.store.dispatchAction(ORDERS_CURRENCY_PAIR_CHANGED, ccyPair);
    };

    onBookRequested = () => {
        this.store.dispatchAction(ORDERS_BOOK);
    };

    

    render() {

        let showNotification = this.state.isBooking? orderNotifications.progress : ""
        if(this.state.bookingResults === true)
            showNotification = orderNotifications.success
        if(this.state.bookingResults === false)
            showNotification = orderNotifications.failed + ` (msg: ${this.state.bookingError})`

        return (
            <div>
                <h1>OrdersList</h1>
                Amount: <input type="text" value={this.state.amount}
                               onChange={(e) => this.onAmountChanged(e.target.value)}/>
                <br/>
                Currency:
                <select value={this.state.currencyPair} onChange={(e) => this.onCurrencyPairChanged(e.target.value)}>
                {Object.entries(currencyPairs).map(([key, value]) => (
                 <option key={key} value={value}>{value}</option>
                ))}
                </select>
                <br/>
                Order summary: <br/>
                Amount({this.state.amount})
                <br/>
                <Button onClick={(e) => this.onBookRequested()}>
                    book
                </Button>
                <br/>
                <h2 className="notification">{showNotification} </h2>
            </div>
        );
    }
}
