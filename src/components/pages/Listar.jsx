import {useEffect,useState} from "react"
import Menu from "../layouts/Menu.jsx"
import {Link} from "react-router-dom"
import Loading from "../layouts/Loading.jsx"
function Listar(){
    const [dados,setDados]=useState([])
    const [display,setDisplay]=useState("block")
    async function requisitar(){
        await fetch("https://backend-crud-react.onrender.com/api",{
            headers:{
                "Content-type":"application/json",
                authorization:"Bearer "+localStorage.getItem("token")
            },method:"GET"
        }).then((res)=>res.json()).then((results)=>{
            setDados(results)
            setDisplay("none")
        })
    }
    useEffect(()=>{
        requisitar()
    },[])
    return(
        <>
        {dados.length==0&&(
            <Loading sumir={display}/>
        )}
        <Menu/>
        <h2 className='w-100 text-center mt-3'>Listar Usuários</h2>
        <div className="w-100 d-flex align-items-center justify-content-center table-responsive">
            {(dados&&dados!="")&&(
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
                            <td>{valor.email}</td>
                            <td>{valor.tipo}</td>
                            <td><Link to={`/edit/${valor.id}`}>Editar</Link></td>
                            <td><Link to={`/delete/${valor.id}`}>Apagar</Link></td>
                            <td><Link to={`/privilegio/${valor.id}`}>Elevar/Reduzir</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            {!dados||(dados&&dados=="")&&(
                <h3 className="mt-5">Sem usuários cadastrados</h3>
            )}
            </div>
        </>
    )
}
export default Listar