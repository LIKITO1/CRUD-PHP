import {Link,useNavigate} from "react-router-dom"
import styles from "./Menu.module.css"
function Menu({user}){
    user=localStorage.getItem("tipo")
    const navigate=useNavigate()
    function desconectar(){
        localStorage.removeItem("id_usuario")
        localStorage.removeItem("token")
        localStorage.removeItem("tipo")
        navigate("/")
    }
    return(
        <>
        <div className={`d-flex bg-dark gap-2 align-items-center justify-content-center d-sm-none`}>
        <div className={`d-grid w-75 gap-2 m-4 text-center`}>
        <div className="row gap-2">
        <Link to={"/home"} className={`${styles.link} text-light bg-primary rounded-2 p-1 fs-6 col`}>Home</Link>
        {user&&user=="admin"&&(
        <Link to={"/create"} className={`${styles.link} text-light bg-primary rounded-2 p-1 fs-6 col`}>Criar Usuário</Link>
        )}
        </div>
        <div className="row gap-2">
            {user&&user=="admin"&&(
        <Link to={"/list"} className={`${styles.link} text-light bg-primary rounded-2 p-1 fs-6 col`}>Listar Usuários</Link>
            )}
        <Link to={"/perfil"} className={`${styles.link} text-light bg-primary rounded-2 p-1 fs-6 col`}>Perfil</Link>
        <span onClick={desconectar} className={`${styles.link} text-light bg-primary rounded-2 p-1 fs-6 col`}>Desconectar</span>
        </div>
        </div>
        </div>
        <nav className={`w-100 p-3 d-none d-sm-flex bg-dark text-light align-items-center justify-content-around`}>
            <Link to={"/home"} className={`${styles.link} text-light text-center p-3 fs-5`}>
                <div className="bi bi-house fs-1"></div>
                <small className={`${styles.texto}`}>Home</small>
            </Link>
            {user&&user=="admin"&&(
            <>
            <Link to={"/create"} className={`${styles.link} text-light text-center fs-5`}>
            <div className="bi bi-plus-circle fs-1"></div>
            <small className={`${styles.texto}`}>Criar Usuário</small>
            </Link>
            <Link to={"/list"} className={`${styles.link} text-light text-center fs-5`}>
            <div className="bi bi-list-task fs-1"></div>
            <small className={`${styles.texto}`}>Listar usuários</small>
            </Link>
            </>
            )}
            <Link to={"/perfil"} className={`${styles.link} text-light text-center p-3 fs-5`}>
            <div className="bi bi-person fs-1"></div>
            <small className={`${styles.texto}`}>Perfil</small>
            </Link>
            <span onClick={desconectar} className={`${styles.link} text-light text-center p-3 fs-5 `}>
                <div className="bi bi-box-arrow-right fs-1"></div>
                <small className={`${styles.texto} text-center`}>Desconectar</small>
            </span>
        </nav>
        </>
    )
}
export default Menu