import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import Card from "../layouts/Card"
import Loading from "../layouts/Loading"
function FormUser({title,nomeBtn,acao,nomeE,emailE,senhaE,editTipoMsg,caminho}){
    const {id}=useParams()
    const [nome,setNome]=useState("")
    const [email,setEmail]=useState("")
    const [senha,setSenha]=useState("")
    const [tipo,setTipo]=useState("")
    const [tipoMsg,setTipoMsg]=useState("")
    const [msg,setMsg]=useState("")
    const [display,setDisplay]=useState("block")
    const [permitir,setPermitir]=useState(false)
    const local=localStorage
    useEffect(()=>{
        setNome(nomeE ||"")
        setEmail(emailE || "")
        setSenha(senhaE || "")
    },[nomeE,senhaE,emailE])
    async function enviar(e){
        e.preventDefault();
        setMsg("")
        setTipoMsg("")
        await fetch(acao=="criar"?"https://backend-crud-react.onrender.com/create":`https://backend-crud-react.onrender.com/edit/${id}`,{
            method:acao=="criar"?"POST":"PUT",
            headers:{
                "Content-Type":"application/json",
                authorization:"Bearer "+local.getItem("token")
            },body:JSON.stringify({nome,email,senha,tipo})
        }).then((response)=>response.json()).then((res)=>{
            setMsg(res.msg)
            setTipoMsg(res.tipo)
            setDisplay("none")
            if(res.tipo=="success"){
                setPermitir(true)
                setTimeout(()=>{
                  setMsg("Redirecionando...")
                },1500)
              }
        })
    }
    async function reset(e){
        e.preventDefault()
        await fetch(`https://backend-crud-react.onrender.com/reset/${id}`,{
            headers:{
                "Content-Type":"application/json",
                authorization:"Bearer "+local.getItem("token")
            }
        }).then((response)=>response.json()).then((valor)=>{
            setMsg(valor.msg)
            setTipoMsg(valor.tipo)
        })
    }
    return(
        <>
        <form className="mt-3 d-flex align-items-center justify-content-center flex-column gap-2">
            <h2>{title}</h2>
            <label htmlFor="">Nome:</label>
            <input type="text" placeholder="Nome..." className="form-control w-75" onChange={(e)=>{setNome(e.target.value)}} value={nome} required/>
            <label htmlFor="">Email:</label>
            <input type="email" placeholder="Email..." className="form-control w-75" onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
            {acao&&acao=="criar"&&(
                <>
                <label htmlFor="">Senha:</label>
                <input type="password" placeholder="Senha..." className="form-control w-75" onChange={(e)=>{setSenha(e.target.value)}} value={senha} required/>
                <label htmlFor="">Tipo:</label>
                <select className="form-select w-75 w-sm-50" onChange={(e)=>{setTipo(e.target.value)}} required>
                    <option selected disabled>Selecione o tipo de usuário</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuário</option>
                </select>
            </>
            )}
            {acao&&acao!="criar"&&(
                <>
            <label>Senha:</label>
            <button className="btn btn-danger" onClick={reset}>Resetar senha</button>
            <button className="btn btn-success" onClick={enviar}>{nomeBtn}</button>
            </>
            )}
        </form>
        {msg!==""&&tipoMsg!==""&&(
            <>
            <Loading sumir={display}/>
            <Card tipo={tipoMsg!==""?tipoMsg:editTipoMsg} msg={msg} caminho={caminho} permitido={permitir}/>
            </>
        )}
        </>
            )
}
export default FormUser