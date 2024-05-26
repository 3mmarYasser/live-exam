import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (<div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div
                className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-primary/40 before:aspect-square before:opacity-10 md:py-20">
                <div className="relative"><img onContextMenu={(e) => e.preventDefault()}
                                               draggable={false}
                                               src="https://react.vristo.sbthemes.com/assets/images/error/404-light.svg"
                                               alt="404"
                                               className="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"/>
                    <p className="mt-5 text-base ">The page you requested was not found!</p>
                    <Link
                        className="btn btn-wide btn-gradient mx-auto !mt-7  border-0 uppercase shadow-none"
                        to="/">Home</Link>
                </div>
            </div>
        </div>);
};

export default NotFound;
