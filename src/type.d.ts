interface OrdersState {
    amount: string;
    currencyPair: string;
    isBooking: boolean;
    bookingResults?: boolean;
    bookingError?: string
};

interface payloadSuccess {
    ok: boolean,
}

interface payloadError {
    ok: boolean,
    data: {errorMessage: string} 
}
