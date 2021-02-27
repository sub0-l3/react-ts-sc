import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import OrdersView from '../../../src/orders/views/ordersView';


let container:HTMLElement = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe('OrdersView Component', () => {
    it('should render without crashing', () => {
        expect(() => render(<OrdersView />, container)).not.toThrowError();
    });

    it('should show progress notification when book button is clicked',  () => {
        act(() => {
            render(<OrdersView />, container);
        });

        const button = container.querySelector('button');

        act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        const notification: HTMLElement = container.querySelector('.notification');
        expect(notification.textContent.trim()).toBe('Booking In Progress');
    });
});