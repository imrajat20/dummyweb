import { createSlice } from "@reduxjs/toolkit";

const initialState = {showCart: false, counter:0, items: [], totalQuantity: 0}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart(state) {
            state.showCart = true;
        },
        increase(state){
            state.counter++;
            state.totalQuantity++;
        },
        decrease(state){
            state.counter--;
            state.totalQuantity--;
        },
        addItem(state, action){
            const newItem = action.payload;
            const existing = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if(!existing){
                state.items.push({ 
                    id: newItem.id, 
                    price: newItem.price, 
                    quantity: 1,  
                    totalPrice: newItem.price,
                    title: newItem.title})
            } else {
                existing.quantity++;
                existing.totalPrice = existing.totalPrice + newItem.price;
            }
        },
        removeItem(state,action){
            const id = action.payload;
            const existing = state.items.find(item => item.itemId === id);
            state.totalQuantity--;
            if( existing.quantity === 1){
                state.items = state.items.filter(item => item.itemId !== id);
            } else {
                existing.quantity--;
                existing.totalPrice = existing.totalPrice - existing.price;
            }
        }
    }

});

export const cartAction = cartSlice.actions;
export default cartSlice;

