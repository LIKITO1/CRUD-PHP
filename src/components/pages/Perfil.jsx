import Menu from "../layouts/Menu"
import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import Loading from "../layouts/Loading"
import Card from "../layouts/Card"
function Perfil(){
    const [nome,setNome]=useState("")
    const [email,setEmail]=useState("")
    const [sumir,setSumir]=useState("flex")
    const [tipo,setTipo]=useState("")
    const [tipoMsg,setTipoMsg]=useState("")
    const [msg,setMsg]=useState("")
    const [permitir,setPermitir]=useState(false)
    const navigate=useNavigate("")
    function editar(){
        const id=localStorage.getItem("id_usuario")
        navigate(`/editDados/${id}`,{
            state:{
                nome:nome,
                email:email
            }
        })
    }
    useEffect(()=>{
        async function requisitar(){
            await fetch("https://backend-crud-react.onrender.com/api",{
                headers:{
                    "Content-Type":"application/json",
                    authorization:"Bearer "+localStorage.getItem("token")
                }
            }).then((response)=>response.json()).then((valor)=>{
                setSumir("none")
                if(valor.msg&&valor.tipo=="danger"){
                    setTipoMsg(valor.tipo)
                    setMsg(valor.msg)
                    setTimeout(()=>{
                        setMsg("Redirecionando...")
                        setPermitir(true)
                    },1500)
                    return ;
                }
                valor.dados.forEach((dados)=>{
                    if(dados.id==localStorage.getItem("id_usuario")){
                        setNome(dados.nome)
                        setEmail(dados.email)
                    }
                })
            })
        }
        requisitar()
        setTipo(localStorage.getItem("tipo"))
    },[])
    return(
        <>
        {sumir&&sumir=="flex"&&(
            <Loading sumir={sumir}/>
        )}
        {msg&&msg!=""&&(
            <Card msg={msg} tipo={tipoMsg} permitido={permitir} caminho="/"/>
        )}
        <Menu/>
        <div className="w-100 h-100 d-flex align-items-center justify-content-center flex-column gap-3 mt-5">
            <h2 className="fs-1">Perfil de usuário</h2>
            <p className="fs-4">Nome:{nome}</p>
            <p className="fs-4">Email:{email}</p>
            <p className="fs-4">Tipo de usuário:{tipo}</p>
            <button onClick={editar} className="btn btn-success bi bi-pencil p-1 p-sm-2">&nbsp;Editar dados</button>
        </div>
        </>
    )
}
export default Perfil