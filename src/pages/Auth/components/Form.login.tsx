import React from 'react';
import classNames from "classnames";
import {BsMicrosoft} from "react-icons/bs";
import {Formik, Form as Formo, Field} from "formik";
import {useLoginMutation} from "../../../graphql/generated/graphql.tsx";
import {setToken} from "../../../utils/token.helper.ts";
import useDidMountEffect from "../../../hooks/useDidMountEffect/useDidMountEffect.hook.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store";
import {authorized} from "../../../reducers/auth/auth.reducer.ts";
import {useToasts} from "react-toast-notifications";
import {Auth} from "../../../reducers/auth/auth.interface.ts";

const Form = () => {
    const [Login ,{data,loading,error}] = useLoginMutation()
    const dispatch:AppDispatch = useDispatch();
const {addToast} = useToasts();
    useDidMountEffect(()=>{
        if(!loading && !error && data){
            const {__typename ,...UserData} = data?.login.user
            dispatch(authorized({user:UserData , token:data?.login.access_token.token}as Auth));
            addToast("Login successfully", { appearance: 'success',autoDismiss:true});
        }else if(!loading && error){
            addToast(error?.message, { appearance: 'error',autoDismiss:true});

        }
    },[loading ,error ,data])
    const LoginFC =  async (values)=>{
        await Login({variables:values}).then((res)=>{
            setToken(res.data?.login.access_token.token)
        })
    }
    const initialValues = {
        password:"",
        email:""
    }
    return (
        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">

            <div className="w-full max-w-[440px] lg:mt-16">
                <div className="mb-10"><h1
                    className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">LOGIN</h1>
                    <p className="text-base font-bold leading-normal text-base-content/50">Enter
                        your MUC email and password to login </p>
                </div>
                <Formik initialValues={initialValues} onSubmit={LoginFC}>
                    {(props)=>(
                        <Formo>
                            <div className="space-y-5">
                                <div><label htmlFor="Email">Email</label>
                                    <div className="relative">
                                        <Field name={"email"} id="Email" type="email"
                                               placeholder="12345678@muc.edu.eg"
                                               className="form-input ps-10 placeholder:text-base-200s"/>
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path opacity="0.5"
                                                                                                  d="M10.65 2.25H7.35C4.23873 2.25 2.6831 2.25 1.71655 3.23851C0.75 4.22703 0.75 5.81802 0.75 9C0.75 12.182 0.75 13.773 1.71655 14.7615C2.6831 15.75 4.23873 15.75 7.35 15.75H10.65C13.7613 15.75 15.3169 15.75 16.2835 14.7615C17.25 13.773 17.25 12.182 17.25 9C17.25 5.81802 17.25 4.22703 16.2835 3.23851C15.3169 2.25 13.7613 2.25 10.65 2.25Z"
                                                                                                  fill="currentColor"></path><path
                                    d="M14.3465 6.02574C14.609 5.80698 14.6445 5.41681 14.4257 5.15429C14.207 4.89177 13.8168 4.8563 13.5543 5.07507L11.7732 6.55931C11.0035 7.20072 10.4691 7.6446 10.018 7.93476C9.58125 8.21564 9.28509 8.30993 9.00041 8.30993C8.71572 8.30993 8.41956 8.21564 7.98284 7.93476C7.53168 7.6446 6.9973 7.20072 6.22761 6.55931L4.44652 5.07507C4.184 4.8563 3.79384 4.89177 3.57507 5.15429C3.3563 5.41681 3.39177 5.80698 3.65429 6.02574L5.4664 7.53583C6.19764 8.14522 6.79033 8.63914 7.31343 8.97558C7.85834 9.32604 8.38902 9.54743 9.00041 9.54743C9.6118 9.54743 10.1425 9.32604 10.6874 8.97558C11.2105 8.63914 11.8032 8.14522 12.5344 7.53582L14.3465 6.02574Z"
                                    fill="currentColor"></path>
                                </svg>
                            </span>
                                    </div>
                                </div>
                                <div><label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <Field name="password" id="Password"
                                               type="password" placeholder="Enter Password"
                                               className="form-input ps-10"/>
                                        <span
                                            className="absolute start-4 top-1/2 -translate-y-1/2"><svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"><path
                                            opacity="0.5"
                                            d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z"
                                            fill="currentColor"></path><path
                                            d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z"
                                            fill="currentColor"></path><path
                                            d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z"
                                            fill="currentColor"></path><path
                                            d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z"
                                            fill="currentColor"></path><path
                                            d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z"
                                            fill="currentColor"></path></svg></span></div>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Remember me</span>
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm"/>
                                    </label>
                                </div>

                                <button type="submit"
                                        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                >Sign in
                                </button>
                            </div>

                        </Formo>

                    )}
                </Formik>
                <div className="divider">OR</div>

                <div className="mb-10 md:mb-[60px]">
                    <button type={"button"}
                            className={classNames("w-full flex items-center justify-center relative rounded px-1 py-2.5 overflow-hidden group  hover:bg-gradient-to-r  text-white hover:ring-2 hover:ring-offset-2   ring-offset-base-200 transition-all ease-out duration-300",
                                "hover:ring-blue-400 hover:to-blue-400 hover:from-blue-500 bg-blue-500",
                                "gap-3"
                            )}>
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span>Sign in with Microsoft</span>
                        <span className="relative text-2xl">
                            <BsMicrosoft/>
                        </span>
                    </button>
                </div>

                <div className="text-center ">Start Your Exam Right Know</div>
            </div>
            <p className="absolute bottom-6 w-full text-center">© 2024.MUC.Ammar</p></div>
    );
};

export default Form;