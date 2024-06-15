import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {showCart: false},
    reducers: {
        toggleCart(state) {
            state.showCart = true;
        }
    }

});

export const cartAction = cartSlice.actions;
export default cartSlice;

