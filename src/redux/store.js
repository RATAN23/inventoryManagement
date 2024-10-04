import { configureStore } from "@reduxjs/toolkit";
import admin from "../reducers/admin";
import data from "../reducers/data";


const store = configureStore({
    reducer : {
        admin : admin,
        cart  : data
    }
})

export default store