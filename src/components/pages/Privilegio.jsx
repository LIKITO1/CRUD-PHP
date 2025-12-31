import {useParams} from "react-router-dom"
import {useState,useEffect} from "react"
import Loading from "../layouts/Loading"
function Privilegio(){
    const {id}=useParams()
    const [display,setDisplay]=useState("flex")
    useEffect(()=>{
        async function requisitar(){
            await fetch("https://backend-crud-react.onrender.com/privilege",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    authorization:"Bearer "+localStorage.getItem("token")
                },
                body:JSON.stringify({id})
            }).then((response)=>response.json()).then((res)=>{
                console.log(res.msg)
            })
        }
        requisitar()
    },[])
    return(
        <>
            <Loading sumir={display}/>
        </>
    )
}
export default Privilegio