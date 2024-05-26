import React from 'react';
import {Link} from "react-router-dom";
import {RiLogoutCircleRLine, RiMenuFill} from "react-icons/ri";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store";
import {unauthorized} from "../../../reducers/auth/auth.reducer.ts";

const Navbar:React.FC = () => {
    const dispatch:AppDispatch = useDispatch();
    const logout = ()=>{
        dispatch(unauthorized());
        window.location.reload();
    }
    return (
        <div className="relative bg-base-100 flex w-full justify-between items-center px-5 py-2.5 ">
            <div className="flex justify-between items-center lg:ml-2 gap-3">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
                    <RiMenuFill className="text-xl" />

                </label>

                <Link className="flex items-center shrink-0 gap-2" to="/">

                    <img className="w-8 -mr-1 inline"
                         onContextMenu={(e) => e.preventDefault()}
                         src="https://muc.edu.eg/assets/img/preloader.gif" alt="logo"/>
                    <span
                        className="text-2xl mr-1.5  font-[300]  align-middle hidden md:inline  transition-all duration-300">
                            ONLINE EXAM
                        </span></Link>
            </div>

            <div className="sm:ml-0 ml-auto flex items-center space-x-1.5 lg:space-x-2 ">
                <div className="ml-auto">

                    <form
                        className="false sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden">
                        <div className="relative">
                            <input type="text"
                                   className="form-input pl-9  sm:bg-transparent bg-base-200 placeholder:tracking-widest"
                                   placeholder="Search..."/>
                            <button type="button"
                                    className="absolute w-9 h-9 inset-0 right-auto appearance-none peer-focus:text-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                                    <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5"
                                            opacity="0.5"></circle>
                                    <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5"
                                          strokeLinecap="round"></path>
                                </svg>
                            </button>
                            <button type="button"
                                    className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="1.5"></circle>
                                    <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor"
                                          strokeWidth="1.5" strokeLinecap="round"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                <button type="button"
                        className="relative block p-2 rounded-full bg-base-200/60 hover:text-primary hover:bg-base-200 ">
                            <span><svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                       xmlns="http://www.w3.org/2000/svg"><path
                                d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                                stroke="currentColor" strokeWidth="1.5"></path><path opacity="0.5"
                                                                                     d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                                                                                     stroke="currentColor"
                                                                                     strokeWidth="1.5"
                                                                                     strokeLinecap="round"></path><path
                                opacity="0.5" d="M12 6V10" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round"></path></svg><span
                                className="flex absolute w-3 h-3 right-0  top-0"><span
                                className="animate-ping absolute -left-[3px]  -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span><span
                                className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span></span></span>
                </button>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                        </div>
                    </div>
                    <ul tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link to={"/student/profile"} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to={"/student/settings"}>Settings</Link></li>
                        <li><button  role={"logout"} onClick={logout}>Logout</button></li>
                    </ul>
                </div>
                <button type="button"
                        role={"logout"}
                        onClick={logout}
                        className="relative block p-2 rounded-full 200/60 hover:text-primary hover:bg-base-200 ">

                    <RiLogoutCircleRLine className="text-2xl"/>

                </button>
            </div>
        </div>

    );
};

export default Navbar;
