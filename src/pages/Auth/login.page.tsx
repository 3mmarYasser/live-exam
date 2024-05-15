import React from "react";
import FormLogin from "./components/Form.login.tsx";
import DescriptionLogin from "./components/Description.login.tsx";

const Login: React.FC = () => {
    return (
        <div
            dir={"ltr"}
            className=" collapsible-vertical full  main-section antialiased relative font-nunito text-sm font-normal">
            <div className="text-base-content min-h-screen">
                <div>
                    <div className="absolute inset-0">
                        <img src="https://react.vristo.sbthemes.com/assets/images/auth/bg-gradient.png"
                             alt="image"
                             className="h-full w-full object-cover"/>
                    </div>
                    <div className="relative flex min-h-screen items-center justify-center bg-[url(https://react.vristo.sbthemes.com/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat dark:bg-base-100 px-6 py-10  sm:px-16">
                        <img src="https://react.vristo.sbthemes.com/assets/images/auth/coming-soon-object1.png"
                             alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"/>

                        <img src="https://react.vristo.sbthemes.com/assets/images/auth/coming-soon-object2.png"
                             alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]"/>

                        <img src="https://react.vristo.sbthemes.com/assets/images/auth/coming-soon-object3.png"
                             alt="image" className="absolute right-0 top-0 h-[300px]"/>

                        <img src="https://react.vristo.sbthemes.com/assets/images/auth/polygon-object.svg"
                             alt="image" className="absolute bottom-0 end-[28%]"/>

                        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-base-100/60 backdrop-blur-lg  lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">

                            <DescriptionLogin/>

                            <FormLogin/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;