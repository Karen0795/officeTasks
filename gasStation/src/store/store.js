import { configureStore } from "@reduxjs/toolkit";
import { stationReducer } from "./slices/stationSlice";

export const store = configureStore({
    reducer: {
        station : stationReducer
    }
})