import {useState} from "react"
import {useNavigate,useLocation} from "react-router-dom"
import Card from "../layouts/Card"
import Loading from "../layouts/Loading"
function EditDados(){
    const location=useLocation()
    const [nome,setNome]=useState(location.state?.nome ?? "")
    const [email,setEmail]=useState(location.state?.email ?? "")
    const [msg,setMsg]=useState("")
    const [tipo,setTipo]=useState("")
    const [display,setDisplay]=useState("none")
    const [permitir,setPermitir]=useState(false)
    const [cardId,setCardId]=useState(0)
    const navigate=useNavigate()
    async function editar(){
        setDisplay("flex")
        await fetch("https://backend-crud-react.onrender.com/editDados",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                authorization:"Bearer "+localStorage.getItem("token")
            },body:JSON.stringify({nome,email,id:localStorage.getItem("id_usuario")})
        }).then((response)=>response.json()).then((res)=>{
            setCardId((e)=>e+1)
            setDisplay("none")
            setMsg(res.msg)
            setTipo(res.tipo)
            if(res.tipo=="success"){
            setPermitir(true)
            setTimeout(()=>{
                setMsg("Redirecionando...")
            },1500)
        }
        })
    }
    function voltar(){
        navigate("/perfil")
    }
    return(
        <>
            <div className="position-absolute text-light w-100 h-100 d-flex align-items-center justify-content-center flex-column bg-dark">
                <h2 className="mb-5 display-4">Editar Dados</h2>
                <label className="mb-2">Nome:</label>
                <input type="text" placeholder="Nome..." className="form-control w-50" onChange={(e)=>setNome(e.target.value)} value={nome}/>
                <label className="mt-3 mb-2">Email:</label>
                <input type="email" placeholder="Email..." className="form-control w-50" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <button className="btn btn-success mt-3" onClick={editar}>Editar</button>
                <button className="btn btn-success mt-3" onClick={voltar}>Voltar</button>
            </div>
            {msg&&msg!=""&&(
                <Card tipo={tipo} msg={msg} caminho="/perfil" permitido={permitir} key={cardId}/>
            )}
            <Loading sumir={display}/>
        </>
    )
}
export default EditDados