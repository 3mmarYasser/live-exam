import {createSlice} from "@reduxjs/toolkit";
import {Auth} from "./auth.interface";
import {getToken, removeToken, setToken} from "../../utils/token.helper";

const initialState:Auth ={
    isLoginIn:false,
    token:getToken(),
    user:null,
    isLoading:!!getToken()
}
const authReducer = createSlice({
    name:"auth",
    initialState,
    reducers:{
        authorized:(state,action)=>{
            state.user = action.payload.user;
            action.payload.token && (state.token = action.payload.token);
            action.payload.token && setToken(action.payload.token);
            state.isLoading= false
            state.isLoginIn = true
        },
        unauthorized:(state)=>{
            state.user = null;
            state.token = null;
            removeToken();
            state.isLoading = false
            state.isLoginIn = false
            window.localStorage.removeItem("quizResult")
        },
    },

});
export const {authorized,unauthorized} = authReducer.actions
export default authReducer.reducer;