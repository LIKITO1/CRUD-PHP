import {Navigate,Outlet,useLocation} from "react-router-dom"
function PrivateRoute(){
    const location=useLocation()
    const autentica=localStorage.getItem("token")
        if((location.pathname.split("/")[1]=="edit"||location.pathname.split("/")[1]=="delete"||location.pathname.split("/")[1]=="privilegio")&&localStorage.getItem("tipo")!="admin"){
            return <Navigate to="/home"/>
        }
    return autentica?<Outlet/>:<Navigate to="/"/>
}
export default PrivateRoute