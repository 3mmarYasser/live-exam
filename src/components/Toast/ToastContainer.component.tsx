import React from 'react';
import {ToastContainerProps} from "react-toast-notifications";


const placements = {
    'top-left': { top: 0, left: 0 },
    'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: 0, right: 0},
};
const ToastContainer:React.FC<ToastContainerProps> = ({children ,placement ,className,hasToasts}) => {
    return (
        <div id="toasts" style={{
            boxSizing: 'border-box',
            maxHeight: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            pointerEvents: hasToasts ? "unset" : 'none',
            position: 'fixed',
            zIndex: 1000,
            ...placements[placement],
        }}>
            {children}
        </div>
    );
};

export default ToastContainer;