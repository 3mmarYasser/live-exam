import React from 'react';

import NavbarDashboard from "./components/Navbar.dashboard.tsx";
import {NavLink, Outlet} from "react-router-dom";
import {MdOutlineQuiz, MdOutlineSupportAgent} from "react-icons/md";
import classNames from "classnames";
import {PiExam} from "react-icons/pi";
import {TbActivity} from "react-icons/tb";
import {SlUser} from "react-icons/sl";
import {IoSettingsSharp} from "react-icons/io5";
import {FaClipboardQuestion} from "react-icons/fa6";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute.component.tsx";

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <div className="w-full min-h-screen bg-base-200">
                <NavbarDashboard/>

                <div className="drawer lg:drawer-open mt-2.5 ">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>

                    <div className="drawer-content p-5 lg:p-14 lg:ml-2.5 lg:rounded-tl  bg-base-100">

                        <Outlet/>
                    </div>
                    <div className="drawer-side h-full">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="w-80 flex flex-col py-8 gap-3 min-h-full lg:rounded-tr bg-base-100 text-base-content">
                            <li>
                                <NavLink to="/student/available-exams" className={({
                                                                                       isActive,
                                                                                       isPending
                                                                                   }) => classNames("w-full py-2 px-8 text-lg flex items-center gap-3 text-base-content/60 group hover:bg-base-200/40  ", {" shadow !text-base-content border-r-4 border-r-primary": isPending || isActive})}>
                                    {({isActive, isPending}) => (
                                        <>
                                            <MdOutlineQuiz
                                                className={classNames("text-2xl  ", {"text-primary": isPending || isActive})}/>
                                            <span>Available Exams</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/exam-attempts" className={({
                                                                                     isActive,
                                                                                     isPending
                                                                                 }) => classNames("w-full py-2 px-8 text-lg flex items-center gap-3 text-base-content/60 group hover:bg-base-200/40  ", {" shadow !text-base-content border-r-4 border-r-primary": isPending || isActive})}>
                                    {({isActive, isPending}) => (
                                        <>
                                            <TbActivity
                                                className={classNames("text-2xl  ", {"text-primary": isPending || isActive})}/>
                                            <span>My Exam Attempts</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/grades" className={({
                                                                              isActive,
                                                                              isPending
                                                                          }) => classNames("w-full py-2 px-8 text-lg flex items-center gap-3 text-base-content/60 group hover:bg-base-200/40  ", {" shadow !text-base-content border-r-4 border-r-primary": isPending || isActive})}>
                                    {({isActive, isPending}) => (
                                        <>
                                            <PiExam
                                                className={classNames("text-2xl  ", {"text-primary": isPending || isActive})}/>
                                            <span>Grades</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/profile" className={({
                                                                               isActive,
                                                                               isPending
                                                                           }) => classNames("w-full py-2 px-8 text-lg flex items-center gap-3 text-base-content/60 group hover:bg-base-200/40  ", {" shadow !text-base-content border-r-4 border-r-primary": isPending || isActive})}>
                                    {({isActive, isPending}) => (
                                        <>
                                            <SlUser
                                                className={classNames("text-2xl  ", {"text-primary": isPending || isActive})}/>
                                            <span>Profile</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/settings" className={({
                                                                                isActive,
                                                                                isPending
                                                                            }) => classNames("w-full py-2 px-8 text-lg flex items-center gap-3 text-base-content/60 group hover:bg-base-200/40  ", {" shadow !text-base-content border-r-4 border-r-primary": isPending || isActive})}>
                                    {({isActive, isPending}) => (
                                        <>
                                            <IoSettingsSharp
                                                className={classNames("text-2xl  ", {"text-primary": isPending || isActive})}/>
                                            <span>Settings</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <h3 className="ml-5 text-xl my-5 font-medium">Help</h3>
                            <li>
                                <NavLink to="/student/support" className={({
                                                                               isActive,
                                                                               isPending
                                                                           }) => classNames("w-full py-2 px-8 text-lg flex items-center gap-3 text-base-content/60 group hover:bg-base-200/40  ", {" shadow !text-base-content border-r-4 border-r-primary": isPending || isActive})}>
                                    {({isActive, isPending}) => (
                                        <>
                                            <MdOutlineSupportAgent
                                                className={classNames("text-2xl  ", {"text-primary": isPending || isActive})}/>
                                            <span>Support</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/questions" className={({
                                                                                 isActive,
                                                                                 isPending
                                                                             }) => classNames("w-full py-2 px-8 text-lg flex items-center gap-3 text-base-content/60 group hover:bg-base-200/40  ", {" shadow !text-base-content border-r-4 border-r-primary": isPending || isActive})}>
                                    {({isActive, isPending}) => (
                                        <>
                                            <FaClipboardQuestion
                                                className={classNames("text-2xl  ", {"text-primary": isPending || isActive})}/>
                                            <span>Common Questions</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>

        </ProtectedRoute>
    );
};

export default Dashboard;