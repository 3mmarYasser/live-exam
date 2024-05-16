import React, {Suspense, useEffect} from 'react'
import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Auth/login.page.tsx";
import QuizPage from "../pages/Quiz/Quiz.page.tsx";
import {useToasts} from "react-toast-notifications";
import {AppDispatch, RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import useDidMountEffect from "../hooks/useDidMountEffect/useDidMountEffect.hook.tsx";
import {authorized, unauthorized} from "../reducers/auth/auth.reducer.ts";
import {Auth} from "../reducers/auth/auth.interface.ts";
import {getToken} from "../utils/token.helper.ts";
import {useGetAuthLazyQuery} from "../graphql/generated/graphql.tsx";

const App:React.FC =()=>{
    const {addToast } = useToasts();
    const dispatch:AppDispatch = useDispatch();
    // const {isLoading} = useSelector((state:RootState)=>state.auth);
    const [GetAuth,{data:AuthData ,error:AuthError ,loading:AuthLoading}] = useGetAuthLazyQuery()
    useDidMountEffect(()=>{
        if(!AuthLoading && !AuthError && AuthData){
            const {__typename , ...UserData} = AuthData.auth
            dispatch(authorized({user:UserData} as Auth));
        }else if(!AuthLoading && AuthError) {
            addToast(AuthError?.message ? AuthError.message :"Something Went wrong",{appearance:"error" ,autoDismiss:true});
            dispatch(unauthorized());
        }
    },[AuthData ,AuthError ,AuthLoading])
    useEffect(()=>{
        if(getToken()){
            (async ()=>{
                await GetAuth();
            })();
        }
    },[]);

    return (
        <>
        <BrowserRouter>
            <div className="overflow-hidden min-h-screen">
                <Suspense fallback={<div>Loading...</div>}>
                    <main className="relative">

                        <Routes>
                            <Route path="/" element={<Login/>}/>
                            <Route path="/quiz" element={<QuizPage/>}/>
                        </Routes>
                    </main>
                </Suspense>
            </div>
        </BrowserRouter>
        </>
    )

}
export default App
