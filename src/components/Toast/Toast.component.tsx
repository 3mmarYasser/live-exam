import React, {useEffect, useRef, useState} from 'react';
import {Placement, ToastProps} from "react-toast-notifications";
import classNames from "classnames";
import {TiInfoLarge, TiTick} from "react-icons/ti";
import {MdDangerous} from "react-icons/md";
import {RiAlarmWarningFill} from "react-icons/ri";
import {IoClose} from "react-icons/io5";


const Toast:React.FC<ToastProps> = ({children,transitionDuration,onDismiss,transitionState,placement,appearance ,isRunning,autoDismissTimeout,autoDismiss}) => {
    const [height, setHeight] = useState<number |string>('auto');
    const elementRef= useRef<HTMLDivElement>(null);
    useEffect(
        () => {
            if (transitionState === 'entered') {
                const el = elementRef.current as HTMLDivElement;
                setHeight(el.offsetHeight + 8);
            }
            if (transitionState === 'exiting') {
                setHeight(0);
            }
        },[transitionState]);
    const toastStates = (placement: Placement) => ({
        entering: { transform: 'translate3d(0, 120%, 0) scale(0.9)' },
        entered: { transform: 'translate3d(0, 0, 0) scale(1)' },
        exiting: { transform: 'translate3d(0, 120%, 0) scale(0.9)' },
        exited: { transform: 'translate3d(0, 120%, 0) scale(0.9)' },
    });
    const appearances = {
        success: {
            icon: <TiTick/>,
            text: "text-success-content",
            bg: "bg-success",
        },
        error: {
            icon: <MdDangerous/>,
            text: "text-error-content",
            bg: "bg-error",
        },
        warning: {
            icon: <RiAlarmWarningFill/>,
            text: "text-warning-content",
            bg: "bg-warning",
        },
        info: {
            icon: <TiInfoLarge/>,
            text: "text-info-content",
            bg: "bg-info",
        },
    };
    return (
        <div   ref={elementRef} style={{
            transition: `height ${transitionDuration - 100}ms 100ms`,
            height
        }}>

            <div className={classNames("relative flex items-center w-full max-w-xs p-4 text-base-content bg-base-300 rounded-lg shadow mb-3 shadow")}
                 style={{
                     ...toastStates(placement)[transitionState],
                     transitionProperty: `transform`,
                     transitionDuration: `${transitionDuration}ms`,
                     transitionTimingFunction: `cubic-bezier(0.2, 0, 0, 1)`,
                     transformOrigin: 'bottom',
                 }}
                 role="alert">

                <div className={classNames("absolute w-full bottom-0 h-1  rounded-lg left-0",{[appearances[appearance].bg]:autoDismiss})} style={{
                    animation: `lineLoadingAnimate ${autoDismissTimeout}ms linear`,
                    animationFillMode:"forwards",
                    animationPlayState: isRunning ? 'running' : 'paused',
                    position: 'absolute',
                }}/>
                <div className="w-full flex justify-between  items-center">
                    <div className="flex gap-3  items-center">
                        <div className={classNames("inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-xl",`${appearances[appearance].text} ${appearances[appearance].bg}`)}>
                            {appearances[appearance].icon}
                        </div>
                        <div className="text-sm font-normal">{children}</div>
                    </div>
                    <button type="button" className="mr-5  text-2xl hover:text-error" aria-label="Close" onClick={()=>onDismiss()}>
                        <IoClose/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;