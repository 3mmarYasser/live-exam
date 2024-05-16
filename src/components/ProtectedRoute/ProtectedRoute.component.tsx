import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Navigate, useNavigate} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

interface Props {
    children:JSX.Element;
    permissions?:[];
}
const ProtectedRoute:React.FC<Props> = ({children}) => {
    const { addToast} = useToasts();
    const {isLoginIn , isLoading} = useSelector((state:RootState)=>state.auth)
    useEffect(()=>{
        if(!isLoading && !isLoginIn){
            addToast("Login in plz",{appearance:"warning" , autoDismiss:true})
        }
    },[])
    if(isLoading) return <h1 className="mt-40">Loading</h1>
    return isLoginIn? children: <Navigate to="/" replace={true}/> ;

};

export default React.memo(ProtectedRoute);