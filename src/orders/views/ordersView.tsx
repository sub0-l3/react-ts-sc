import * as React from 'react';
import {Store} from '../../infrastructure/store';
import {Reducers} from '../store/reducers';
import {SideEffects} from '../store/sideEffects';
import Button from '../../components/Button';

export default class OrdersView extends React.Component<any, any> {
    private store: Store<any>;

    constructor(props: any) {
        super(props);

        const initialState: any = {
            amount: '1m',
            currencyPair: 'USDGBP',
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

        let showNotification = this.state.isBooking? "Booking In Progress" : ""
        if(this.state.bookingResults === true)
            showNotification = "Booking Sucessful"
        if(this.state.bookingResults === false)
            showNotification = "Booking Failed"

        return (
            <div>
                <h1>OrdersList</h1>
                Amount: <input type="text" value={this.state.amount}
                               onChange={(e) => this.onAmountChanged(e.target.value)}/>
                <br/>
                Currency:
                <select value={this.state.currencyPair} onChange={(e) => this.onCurrencyPairChanged(e.target.value)}>
                    <option value="EURUSD">EURUSD</option>
                    <option value="USDJPY">USDJPY</option>
                    <option value="USDGBP">USDGBP</option>
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
