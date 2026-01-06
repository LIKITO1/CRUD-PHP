import Menu from "../layouts/Menu.jsx"
import {useState,useEffect} from "react"
import styles from "./Home.module.css"
import Card from "../layouts/Card.jsx"
import Loading from "../layouts/Loading.jsx"
function Home(){
    const [user,setUser]=useState("")
    const [msg,setMsg]=useState("")
    const [tipo,setTipo]=useState("")
    const [permitir,setPermitir]=useState(false)
    const [display,setDisplay]=useState("flex")
    useEffect(()=>{
        async function requisitar(){
        await fetch("https://backend-crud-react.onrender.com/api",{
            headers:{
                "Content-Type":"application/json",
                authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then((response)=>response.json()).then((res)=>{
            if(res.dados==undefined){
                setMsg(res.msg)
                setTipo(res.tipo)
                setTimeout(()=>{
                    setMsg("Redirecionando...")
                    setPermitir(true)
                },1500)
            }
            res.dados?.forEach((valor)=>{
                if(valor.id==localStorage.getItem("id_usuario")){
                    setUser(valor.nome)
                    setDisplay("none")
                }
            })
        })
    }
    requisitar()
    },[])
    return(
        <>
        <Loading sumir={display}/>
        {msg&&msg!=""&&(
            <Card msg={msg} tipo={tipo} permitido={permitir} caminho="/"/>
        )}
        {tipo!="danger"&&tipo!=""&&(
            <>
        <Menu/>
            <div className="container d-flex align-items-center justify-content-center flex-column p-4">
                <h3 className="mb-5 text-center">Bem Vindo à página principal,<span className="text-capitalize">{user}</span></h3>
                <p className={` text-center ${styles.texto} w-100`}>É um prazer ter você aqui.
                Esta aplicação foi desenvolvida para oferecer uma experiência simples, segura e eficiente no gerenciamento das suas informações.&nbsp;Aqui você pode:</p>
                <ul>
                <li>Visualizar seus dados pessoais</li>
                <li>Manter seu perfil sempre atualizado</li>
                <li>Navegar com segurança em um ambiente protegido</li>
                </ul>
                <p className={`w-100 text-center ${styles.texto}`}>Cada usuário possui acesso apenas às funcionalidades permitidas para o seu perfil, garantindo privacidade, organização e confiabilidade em todas as operações.Caso tenha dúvidas ou precise de suporte, fique à vontade para entrar em contato.
                Esperamos que sua experiência seja produtiva e agradável.</p>
            </div>
            </>
        )}
        </>
    )
}
export default Home