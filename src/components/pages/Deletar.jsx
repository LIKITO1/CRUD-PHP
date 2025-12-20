import {useParams,useNavigate} from "react-router-dom"
import {useEffect,useState} from "react"
import Loading from "../layouts/Loading"
function Deletar(){
    const navigate=useNavigate()
    const {id}=useParams()
    const [tipoMsg,setTipoMsg]=useState("")
    const [msg,setMsg]=useState("")
    const [display,setDisplay]=useState("block")
    function voltar(){
        navigate("/list")
    }
    useEffect(()=>{
        async function requisitar(){
            await fetch(`https://backend-crud-react.onrender.com/delete/${id}`,{
                method:"DELETE",
                headers:{
                    autorizar:local.getItem("token"),
                    "Content-Type":"application/json"
                }
            }).then((response)=>response.json()).then((res)=>{
                setMsg(res.msg)
                setTipoMsg(res.tipo)
                setDisplay("none")
            })
        }
        requisitar()
    },[])
    return(
        <>
        <div className={`bg-dark w-100 h-100 position-absolute gap-3 text-${tipoMsg} d-flex align-items-center justify-content-center fs-2 flex-column`}>
            {msg}
            <button className="btn btn-success" onClick={voltar}>Voltar</button>
        </div>
        <Loading sumir={display}/>
        </>
    )
}
export default Deletar