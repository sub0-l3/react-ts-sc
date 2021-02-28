import * as React from 'react';
import {Store} from '../../infrastructure/store';
import {Reducers} from '../store/reducers';
import {SideEffects} from '../store/sideEffects';
import Button from '../../components/Button';
import {currencyPairs, orderNotifications} from '../../lib/constants';

export default class OrdersView extends React.Component<any, any> {
    private store: Store<any>;

    constructor(props: any) {
        super(props);

        const initialState: any = {
            amount: '1m',
            currencyPair: currencyPairs.USDGBP,
            isBooking: false,
            bookingResults: null,
        };

        this.store = new Store(
            initialState,
            Reducers,
            SideEffects,
            (nextState: any) => this.setState(nextState)
        );

        // set initial state
        this.state = this.store.currentState;
    }

    onAmountChanged = (amount: any) => {
        this.store.dispatchAction('onAmountChanged', amount);
    };

    onCurrencyPairChanged = (ccyPair: string) => {
        this.store.dispatchAction('onCurrencyPairChanged', ccyPair);
    };

    onBookRequested = () => {
        this.store.dispatchAction('book');
    };

    

    render() {

        let showNotification = this.state.isBooking? orderNotifications.progress : ""
        if(this.state.bookingResults === true)
            showNotification = orderNotifications.success
        if(this.state.bookingResults === false)
            showNotification = orderNotifications.failed

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
