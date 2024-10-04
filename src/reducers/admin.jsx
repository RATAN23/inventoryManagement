import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name : 'admin',
    initialState : {
        value : true
    },
    reducers : {
        toggle : (state) => {
            state.value = !state.value
        }
    }
})

export const {toggle} = adminSlice.actions;
export default adminSlice.reducer
