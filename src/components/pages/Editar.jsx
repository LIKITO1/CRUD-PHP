import Menu from "../layouts/Menu.jsx"
import Form from "../layouts/Form.jsx"
import Loading from "../layouts/Loading.jsx"
import Card from "../layouts/Card.jsx"
import {useEffect,useState} from "react"
import {useParams} from "react-router-dom"
function Editar(){
    const {id}=useParams()
    const [nome,setNome]=useState("")
    const [email,setEmail]=useState("")
    const [senha,setSenha]=useState("")
    const [tipoMsg,setTipoMsg]=useState("")
    const [msg,setMsg]=useState("")
    const [display,setDisplay]=useState("block")
    const [permitir,setPermitir]=useState(false)
    const caminho="/"
    useEffect(()=>{
        async function requisitar(){
        await fetch(`https://backend-crud-react.onrender.com/api/${id}`,{
            headers:{
                authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then((response)=>response.json()).then((res)=>{
            if(res.tipo=="danger"){
                setTipoMsg(res.tipo)
                setMsg(res.msg)
                setTimeout(()=>{
                    setPermitir(true)
                    setMsg("Redirecionando...")
                },1500)
            }
            setNome(res[0]?.nome||"")
            setEmail(res[0]?.email||"")
            setSenha(res[0]?.senha||"")
            setTipoMsg(res?.tipo)
            setDisplay("none")
        })
    }
    requisitar()
    },[id])
    return(
        <>
            <Loading sumir={display}/>
            {msg&&msg!=""&&(
                <Card msg={msg} tipo={tipoMsg} caminho={caminho} permitido={permitir}/>
            )}
            {tipoMsg!="danger"&&(
                <>
            <Menu/>
            <Form acao="editar" caminho="/list" title="Editar Usuário" nomeBtn="Editar Usuário" nomeE={nome} senhaE={senha} emailE={email} editTipoMsg={tipoMsg}/>
            </>
            )}
        </>
    )
}
export default Editar