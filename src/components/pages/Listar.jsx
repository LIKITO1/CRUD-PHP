import {useEffect,useState} from "react"
import Menu from "../layouts/Menu.jsx"
import {Link} from "react-router-dom"
import Loading from "../layouts/Loading.jsx"
import Card from "../layouts/Card.jsx"
function Listar(){
    const [dados,setDados]=useState([])
    const [display,setDisplay]=useState("block")
    const [msg,setMsg]=useState("")
    const [tipoMsg,setTipoMsg]=useState("inicial")
    const [permitir,setPermitir]=useState(false)
    async function requisitar(){
        await fetch("https://backend-crud-react.onrender.com/api",{
            headers:{
                "Content-type":"application/json",
                authorization:"Bearer "+localStorage.getItem("token")
            },method:"GET"
        }).then((res)=>res.json()).then((results)=>{
            if(results.dados==undefined){
                setDados([])
                setMsg(results.msg)
                setTipoMsg(results.tipo)
                setTimeout(()=>{
                    setMsg("Redirecionando...")
                    setPermitir(true)
                },1500)
                return ;
            }
            setDados(results.dados)
            setDisplay("none")
        })
    }
    useEffect(()=>{
        requisitar()
    },[])
    return(
        <>
        {dados.length==0&&(
            <>
            <Loading sumir={display}/>
            </>
        )}
                {msg&&tipoMsg=="danger"&&(
            <Card tipo={tipoMsg} msg={msg} permitido={permitir} caminho="/"/>
        )}
        {tipoMsg!="danger"&&tipoMsg!=""&&(
            <>
        <Menu/>
        <h2 className='w-100 text-center mt-3'>Listar Usuários</h2>
        <div className="w-100 d-flex align-items-center justify-content-center table-responsive">
            {dados.length>0&&(
            <table className="w-75 mt-4 table-bordered table-sm table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Tipo</th>
                    <th>Editar</th>
                    <th>Apagar</th>
                    <th>Privilégio</th>
                </tr>
                </thead>
                <tbody>
                    {dados.map((valor)=>(
                        <tr key={valor.id}>
                            <td>{valor.id}</td>
                            <td>{valor.nome}</td>
                            <td className="text-truncate" style={{maxWidth:"10dvw"}}>{valor.email}</td>
                            <td>{valor.tipo}</td>
                            <td><Link to={`/edit/${valor.id}`}>Editar</Link></td>
                            <td><Link to={`/delete/${valor.id}`}>Apagar</Link></td>
                            <td><Link to={`/privilegio/${valor.id}`}>Elevar/Reduzir</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            {dados.length<=0&&(
                <h3 className="mt-5">Sem usuários cadastrados</h3>
            )}
            </div>
            </>
        )}
        </>
    )
}
export default Listar