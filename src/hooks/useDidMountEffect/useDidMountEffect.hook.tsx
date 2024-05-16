import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (FC:()=>void ,deps:readonly unknown[]) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) FC();
        else didMount.current = true;
    }, deps);
}

export default useDidMountEffect;