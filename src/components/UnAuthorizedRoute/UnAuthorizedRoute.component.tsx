import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Navigate} from "react-router-dom";

interface Props {
    children:JSX.Element
}
const UnAuthorizedRoute:React.FC<Props> = ({children}) => {
    const {isLoginIn , isLoading} = useSelector((state:RootState)=>state.auth)
    if(isLoading) return <h1 className="mt-40">Loading</h1>
    else return isLoginIn? <Navigate to="/student" replace={true}/> : children;

};

export default React.memo(UnAuthorizedRoute);