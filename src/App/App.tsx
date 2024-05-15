import React, {Suspense} from 'react'
import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Auth/login.page.tsx";

const App:React.FC =()=>{
    return (
        <>
        <BrowserRouter>
            <div className="overflow-hidden min-h-screen">
                <Suspense fallback={<div>Loading...</div>}>
                    <main className="relative">

                        <Routes>
                            <Route path="/" element={<Login/>}/>
                        </Routes>
                    </main>
                </Suspense>
            </div>
        </BrowserRouter>
        </>
    )

}
export default App
