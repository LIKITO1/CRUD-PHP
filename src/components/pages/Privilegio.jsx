import {useParams,useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import Loading from "../layouts/Loading"
function Privilegio(){
    const {id}=useParams()
    const [display,setDisplay]=useState("flex")
    const [msg,setMsg]=useState("")
    const [tipo,setTipo]=useState("")
    const navigate=useNavigate()
    function voltar(){
        navigate("/list")
    }
    useEffect(()=>{
        async function requisitar(){
            await fetch("https://backend-crud-react.onrender.com/privilege",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    authorization:"Bearer "+localStorage.getItem("token")
                },
                body:JSON.stringify({id})
            }).then((response)=>response.json()).then((res)=>{
                setDisplay("none")
                setMsg(res.msg)
                setTipo(res.tipo)
            })
        }
        requisitar()
    },[])
    return(
        <div className={`position-absolute w-100 h-100 bg-dark text-${tipo} flex-column d-flex align-items-center justify-content-center`}>
            <Loading sumir={display}/>
            <h2>{msg}</h2>
            <button onClick={voltar} className="btn btn-success mt-3">Voltar</button>
        </div>
    )
}
export default Privilegio