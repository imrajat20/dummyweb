import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: "ui",
    initialState: {showCart: false, notification: null},
    reducers: {
        toggleCart(state) {
            state.showCart = true;
        },
        setNotification(state, action) {
            state.notification = {status : action.payload.status, title: action.payload.title,message: action.payload.message }
        }
    }
});

export const uiAction = uiSlice.actions;
export default uiSlice;