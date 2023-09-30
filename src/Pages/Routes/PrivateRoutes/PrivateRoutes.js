import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return  <div className="spinner"></div>
    }
    if(!user){
        return <Navigate to={'/login'} state ={{from: location}} replace ></Navigate>
    }
    return children;
    
};

export default PrivateRoutes;