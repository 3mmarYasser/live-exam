import React from 'react';
import {Pops, PopType} from "../../reducers/pops/pops.interface.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {closePop} from "../../reducers/pops/pops.reducer.ts";
import classNames from "classnames";
import AbstractPops from "../AbstractPops/AbstractPops.component.tsx";

interface Props {
    children:((closeModal:()=>void , data:Pops["data"]) => React.ReactNode) | React.ReactNode;
    ModalType:PopType;
    className?:string;
    outSideClick?:boolean;
}
const AbstractModal:React.FC<Props> = ({children,ModalType ,outSideClick=true ,className}) => {
    const {type ,data} = useSelector((state:RootState)=>state.pops)
    const checked = type == ModalType;
    const dispatch:AppDispatch = useDispatch()
    const closeModal= ():void=>{
        dispatch(closePop())
    }
    return (
        <AbstractPops>
            <section>
                <input type="checkbox" checked={checked} className="modal-toggle" readOnly={true} />
                <div className="modal modal-bottom sm:modal-middle" role="dialog">
                    <div className="w-full h-full absolute z-10 " onClick={()=>outSideClick&& closeModal()}/>
                    <div className={classNames("modal-box z-10",className)}>
                        {typeof children === "function" ?
                            children(closeModal,data)
                            :children }
                    </div>
                </div>
            </section>
        </AbstractPops>
    );
};

export default AbstractModal;