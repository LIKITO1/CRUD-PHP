import Menu from "../layouts/Menu.jsx"
import {useState,useEffect} from "react"
function Home(){
    const [user,setUser]=useState("")
    useEffect(()=>{
        async function requisitar(){
        await fetch("https://backend-crud-react.onrender.com/api",{
            headers:{
                "Content-Type":"application/json",
                authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then((response)=>response.json()).then((res)=>{
            res.forEach((valor)=>{
                if(valor.id==localStorage.getItem("id_usuario")){
                    setUser(valor.nome)
                }
            })
        })
    }
    requisitar()
    },[])
    return(
        <>
        <Menu/>
            <div className="container d-flex align-items-center justify-content-center flex-column p-4">
                <h3 className="mb-5">Bem Vindo à página principal , <span className="text-capitalize">{user}</span></h3>
                <p className="w-75">É um prazer ter você aqui.
                Esta aplicação foi desenvolvida para oferecer uma experiência simples, segura e eficiente no gerenciamento das suas informações.&nbsp;Aqui você pode:</p>
                <ul>
                <li>Visualizar seus dados pessoais</li>
                <li>Manter seu perfil sempre atualizado</li>
                <li>Navegar com segurança em um ambiente protegido</li>
                </ul>
                <p className="w-75">Cada usuário possui acesso apenas às funcionalidades permitidas para o seu perfil, garantindo privacidade, organização e confiabilidade em todas as operações.Caso tenha dúvidas ou precise de suporte, fique à vontade para entrar em contato.
                Esperamos que sua experiência seja produtiva e agradável.</p>
            </div>
        </>
    )
}
export default Home