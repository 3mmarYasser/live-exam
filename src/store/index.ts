import {configureStore} from "@reduxjs/toolkit";
import popsReducer from "../reducers/pops/pops.reducer.ts";
import authReducer from "../reducers/auth/auth.reducer.ts";

const store = configureStore({
    reducer: {
        pops:popsReducer,
        auth:authReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;