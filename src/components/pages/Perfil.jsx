import Menu from "../layouts/Menu"
import {useState,useEffect} from "react"
import Loading from "../layouts/Loading"
function Perfil(){
    const [nome,setNome]=useState("")
    const [email,setEmail]=useState("")
    const [sumir,setSumir]=useState("flex")
    const [tipo,setTipo]=useState("")
    useEffect(()=>{
        async function requisitar(){
            await fetch("https://backend-crud-react.onrender.com/api",{
                headers:{
                    "Content-Type":"application/json",
                    authorization:"Bearer "+localStorage.getItem("token")
                }
            }).then((response)=>response.json()).then((valor)=>{
                setSumir("none")
                valor.forEach((dados)=>{
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
        <Menu/>
        <div className="w-100 h-100 d-flex align-items-center justify-content-center flex-column gap-3 mt-5">
            <h2 className="fs-1">Perfil de usuário</h2>
            <p className="fs-4">Nome:{nome}</p>
            <p className="fs-4">Email:{email}</p>
            <p className="fs-4">Tipo de usuário:{tipo}</p>
        </div>
        </>
    )
}
export default Perfil