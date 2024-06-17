import { createSlice } from "@reduxjs/toolkit";
import { uiAction } from "./uiSlice";

const initialState = {counter:0, items: [], totalQuantity: 0}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        replaceCart (state, action){
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
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

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async() => {
            const response = await fetch('https://ecommerce-web-c8b78-default-rtdb.firebaseio.com/cart.json');

            if(!response.ok){
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            return data;
        };

        try{
           const cartData = fetchData();
           dispatch(cartAction.replaceCart(cartData));
        } catch(error){

            dispatch(uiAction.setNotification({
                status: 'error',
                title: 'Error!',
                message: 'failed to get data'
            }))
        }
    };
};

export const cartAction = cartSlice.actions;
export default cartSlice;

