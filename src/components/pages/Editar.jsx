import Menu from "../layouts/Menu.jsx"
import Form from "../layouts/Form.jsx"
import Loading from "../layouts/Loading.jsx"
import {useEffect,useState} from "react"
import {useParams} from "react-router-dom"
function Editar(){
    const {id}=useParams()
    const [nome,setNome]=useState("")
    const [email,setEmail]=useState("")
    const [senha,setSenha]=useState("")
    const [tipoMsg,setTipoMsg]=useState("")
    const [display,setDisplay]=useState("block")
    useEffect(()=>{
        async function requisitar(){
        await fetch(`https://backend-crud-react.onrender.com/api/${id}`,{
            headers:{
                autorizar:local.getItem("token")
            }
        }).then((response)=>response.json()).then((res)=>{
            setNome(res[0].nome||"")
            setEmail(res[0].email||"")
            setSenha(res[0].senha||"")
            setTipoMsg(res.tipo)
            setDisplay("none")
        })
    }
    requisitar()
    },[id])
    return(
        <>
        <Loading sumir={display}/>
            <Menu/>
            <Form acao="editar" caminho="/list" title="Editar Usuário" nomeBtn="Editar Usuário" nomeE={nome} senhaE={senha} emailE={email} editTipoMsg={tipoMsg}/>
        </>
    )
}
export default Editar