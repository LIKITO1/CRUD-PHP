import Menu from "../layouts/Menu.jsx"
import Form from "../layouts/Form.jsx"
import Card from "../layouts/Card.jsx"
import Loading from "../layouts/Loading.jsx"
import {useState,useEffect} from "react"
function Criar(){
    const [msg,setMsg]=useState("")
    const [tipoMsg,setTipoMsg]=useState("inicial")
    const [cardId,setCardId]=useState(0)
    const [display,setDisplay]=useState("none")
    const [permitir,setPermitir]=useState(false)
    const caminho="/"
    useEffect(()=>{
        async function requisitar(){
            await fetch("https://backend-crud-react.onrender.com/api",{
                headers:{
                    "Content-Type":"application/json",
                    authorization:"Bearer "+localStorage.getItem("token")
                }
            }).then((response)=>response.json()).then((res)=>{
                if(res.tipo=="danger"){
                    setMsg(res.msg)
                    setTipoMsg(res.tipo)
                    setCardId((e)=>e+1)
                    setDisplay("flex")
                    setTimeout(()=>{
                        setPermitir(true)
                        setMsg("Redirecionando...")
                    },1500)
                }
            })
        }
        requisitar()
    },[])
    return(
        <>
        {msg&&msg!=""&&(
            <>
            <Loading sumir={display}/>
            <Card msg={msg} tipo={tipoMsg} caminho={caminho} key={cardId} permitido={permitir}/>
            </>
        )}
        {tipoMsg!="danger"&&tipoMsg!=""&&(
            <>
            <Menu/>
            <Form acao="criar" caminho="/list" title="Criar Usuário" nomeBtn="Criar Usuário"/>
            </>
        )}
        </>
    )
}
export default Criar