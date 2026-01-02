import {Navigate,Outlet} from "react-router-dom"
function PrivateRoute(){
    const autentica=localStorage.getItem("token")
    return autentica?<Outlet/>:<Navigate to="/"/>
}
export default PrivateRoute