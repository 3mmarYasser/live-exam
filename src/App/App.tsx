import React, {Suspense, useEffect} from 'react'
import './App.scss'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
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
import DashboardPage from "../pages/Dashboard/Dashboard.page.tsx";
import AvailableExams from "../pages/Dashboard/components/AvailableExams.dashboard.tsx";
import ExamAttempts from "../pages/Dashboard/components/ExamAttempts.dashboard.tsx";
import Profile from "../pages/Dashboard/components/Profile.dashboard.tsx";
import NotFoundPage from "../pages/NotFound/NotFound.page.tsx";
import {openPop} from "../reducers/pops/pops.reducer.ts";
import {Pops, PopType} from "../reducers/pops/pops.interface.ts";
import {MdSettingsSuggest} from "react-icons/md";
import ThemeModal from "../components/ThemeModal/ThemeModal.component.tsx";

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
                        <button
                            onClick={() => dispatch(openPop({type: PopType.ThemesMenu, data: null} as Pops))}
                            className="btn btn-square   bottom-1/2 -right-1 fixed z-10 text-2xl">
                            <MdSettingsSuggest/>
                        </button>
                        <ThemeModal/>
                        <Routes>
                            <Route path="/" element={<Login/>}/>
                            <Route path="/exam/:id" element={<QuizPage/>}/>
                            <Route path="/student" element={<DashboardPage/>}>
                                <Route index element={<Navigate to={"available-exams"}/>}/>
                                <Route path="available-exams" element={<AvailableExams/>}/>

                                <Route path="exam-attempts" element={<ExamAttempts/>}/>
                                <Route path="profile" element={<Profile/>}/>
                                <Route path="settings" element={<h1>My settings"</h1>}/>
                                <Route path="grades" element={<h1>My Results</h1>}/>
                                <Route path="support" element={<h1>support</h1>}/>
                                <Route path="questions" element={<h1>questions</h1>}/>
                            </Route>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </main>
                </Suspense>
            </div>
        </BrowserRouter>
        </>
    )

}
export default App
