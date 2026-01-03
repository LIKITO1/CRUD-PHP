import Form from "../layouts/Form"
import {Link} from "react-router-dom"
function Cadastrar(){
    return(
        <>
        <div className="w-100 h-100 bg-dark text-light position-absolute text-center p-5 d-flex flex-column gap-2">
        <Form title="Cadastro" nomeBtn="Cadastrar" acao="cadastrar" caminho="/home" w={50} dispT={3}/>
        <Link to="/">Login</Link>
        </div>
    </>
    )
}
export default Cadastrar