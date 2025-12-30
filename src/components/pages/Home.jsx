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
                <p className="w-75">Seja muito bem-vindo(a)! Esta é a sua central de gerenciamento, onde você tem o controle total sobre seus registros. Aqui você pode criar, visualizar, editar e excluir informações de forma simples, rápida e segura. Navegue com facilidade e aproveite todas as ferramentas para organizar seus dados com eficiência.</p>
            </div>
        </>
    )
}
export default Home