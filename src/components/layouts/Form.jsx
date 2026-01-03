import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import Card from "../layouts/Card"
import Loading from "../layouts/Loading"
function FormUser({title,nomeBtn,acao,nomeE,emailE,senhaE,editTipoMsg,caminho,w,dispT}){
    const {id}=useParams()
    const [nome,setNome]=useState("")
    const [email,setEmail]=useState("")
    const [senha,setSenha]=useState("")
    const [tipoMsg,setTipoMsg]=useState("")
    const [msg,setMsg]=useState("")
    const [display,setDisplay]=useState("block")
    const [permitir,setPermitir]=useState(false)
    const [cardId,setCardId]=useState(0)
    if(!w){
        w=75
    }
    if(!dispT){
        dispT=0
    }
    useEffect(()=>{
        setNome(nomeE ||"")
        setEmail(emailE || "")
        setSenha(senhaE || "")
    },[nomeE,senhaE,emailE])
    async function enviar(e){
        e.preventDefault();
        setMsg("")
        setTipoMsg("")
        if(acao=="criar"||acao=="cadastrar"){
            if(nome!=""&&senha!=""&&email!=""){
                    setTimeout(()=>{
                        setCardId((e)=>e+1)
                        setMsg("A primeira tentativa do dia pode demorar. Aguarde...")
                        setTipoMsg("light")
                        setPermitir(false)
                        setMostrarCard(true)
                        },500)
        await fetch("https://backend-crud-react.onrender.com/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                authorization:"Bearer "+localStorage.getItem("token")
            },body:JSON.stringify({nome,email,senha})
        }).then((response)=>response.json()).then((res)=>{
            setMsg(res.msg)
            setTipoMsg(res.tipo)
            setDisplay("none")
            if(acao=="cadastrar"){
            localStorage.setItem("token",res.token)
            localStorage.setItem("id_usuario",res.id)
            localStorage.setItem("tipo",res.tipo_user)
            }
            if(res.tipo=="success"){
                setPermitir(true)
                setTimeout(()=>{
                  setMsg("Redirecionando...")
                },1500)
              }
        })
    }else{
        setCardId((e)=>e+1)
        setMsg("Preencha todos os campos e selecione o tipo de usuário")
        setTipoMsg("warning")
        setDisplay("none")
    }
    }
    else{
    await fetch(`https://backend-crud-react.onrender.com/edit/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            authorization:"Bearer "+localStorage.getItem("token")
        },body:JSON.stringify({nome,email,senha})
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
    }
    async function reset(e){
        e.preventDefault()
        await fetch(`https://backend-crud-react.onrender.com/reset/${id}`,{
            headers:{
                "Content-Type":"application/json",
                authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then((response)=>response.json()).then((valor)=>{
            setMsg(valor.msg)
            setTipoMsg(valor.tipo)
        })
    }
    return(
        <>
        <form className="mt-3 d-flex align-items-center justify-content-center flex-column gap-2">
            <h2 className={`display-${dispT}`}>{title}</h2>
            <label htmlFor="">Nome:</label>
            <input type="text" placeholder="Nome..." className={`form-control w-${w}`} onChange={(e)=>{setNome(e.target.value)}} value={nome} required/>
            <label htmlFor="">Email:</label>
            <input type="email" placeholder="Email..." className={`form-control w-${w}`} onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
            {acao&&(acao=="criar"||acao=="cadastrar")&&(
                <>
                <label htmlFor="">Senha:</label>
                <input type="password" placeholder="Senha..." className={`form-control w-${w}`} onChange={(e)=>{setSenha(e.target.value)}} value={senha} required/>
            </>
            )}
            {acao&&(acao!="criar"&&acao!="cadastrar")&&(
                <>
            <label>Senha:</label>
            <button className="btn btn-danger" onClick={reset}>Resetar senha</button>
            <small>Senha após resetá-la:<br/>abc123</small>
            </>
            )}
            <button className="btn btn-success mt-3" onClick={enviar}>{nomeBtn}</button>
        </form>
        {msg!==""&&tipoMsg!==""&&(
            <>
            <Loading sumir={display}/>
            <Card tipo={tipoMsg!==""?tipoMsg:editTipoMsg} msg={msg} caminho={caminho} permitido={permitir} key={cardId}/>
            </>
        )}
        </>
            )
}
export default FormUser