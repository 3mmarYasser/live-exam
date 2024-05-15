import React from "react";
import {Link} from "react-router-dom";

const Description:React.FC = ()=>{
    return (
        <div className="relative hidden w-full items-center justify-center
        bg-gradient-to-br from-primary to-secondary
        p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
            <div
                className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
            <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">

                <Link className="w-48 block lg:w-72 ms-10" to={"/"}>
                    <img src="https://muc.edu.eg/assets/img/logo-white.png"
                         alt="Logo" className="w-full"/></Link>

                <div className="mt-24 hidden w-full max-w-[430px] lg:block"><img
                    src="https://cdn1.link-assistant.com/images/learning-hub/seo-academy/screen-01.svg" alt="Cover Image"
                    className="w-full"/></div>

            </div>
        </div>

    )
}
export default Description;