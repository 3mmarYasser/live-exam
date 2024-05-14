import React, {Fragment} from 'react';
import ReactDOM from "react-dom";
interface Props {
    children:React.JSX.Element,
    disabled?:boolean
}
const AbstractPops:React.FC<Props> = ({children,disabled=false}) => {
    if(disabled) return <Fragment>{children}</Fragment>
    else return ReactDOM.createPortal(
        children ,document.getElementById("pops") as HTMLElement)
};

export default React.memo(AbstractPops);