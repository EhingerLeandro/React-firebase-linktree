import {AuthProvider} from "../components/AuthProvider";
import {useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import {existsUsername} from "../firebase/firebase";
import {updateUser} from "../firebase/firebase";

/*Estados predefinidos
2: login completo
3: Login pero sin registro
4: No estas logueado
5: Ya existe username
6: Nuevo username, click para continuar */

const ChooseUserView = () =>{
    const navigate = useNavigate();
    const [currentState, setCurrentState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [inputUsername, setInputUsername] = useState("");

    function handleUserLoggedIn(user){
        navigate("/dashboard");
    }
    function handleOnUserNotLoggedIn(user){
        navigate("/login");
    }
    function handleOnUserNotRegistered(user){
        setCurrentUser(user)
        setCurrentState(3);
    }

    function handleInputUsername(e){
       setInputUsername(e.target.value);
    }

    async function handleContinue(){
        if(inputUsername !== ""){
             const exists = await existsUsername(inputUsername);
             if(exists){
                setCurrentState(5)
             }else{
                const tmp = {...currentUser};
                tmp.username= inputUsername;
                tmp.processCompleted = true;
                console.log(tmp);
                await updateUser(tmp);
                setCurrentState(6);
             }
        }
    }
 
    if(currentState === 3 || currentState===5){
        return(
            <div>
                <div>Estas logueado pero no registrado. Tu cuenta google: &apos;{currentUser.displayName}&apos;</div>
                <p>Para terminar el proceso escoger un nombre de usuario</p>
                {currentState===5? <p style={{color:"red"}}>El nombre de usuario ya existe, escoge otro</p>:""}
                <div style={{marginBottom:"10px"}}>
                    <input type="text" onInput={handleInputUsername}/>
                </div>
                <div>
                    <button onClick={handleContinue}>Continue</button>
                </div>
            </div>
        )
    }

    if(currentState===6){
        return(
            <div>
                <h2>Felicidades ya puedes ir a tu perfil a crear tus links</h2>
                <Link to="/dashboard">Continuar</Link>
            </div>
        )
    }

    return (<AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleOnUserNotLoggedIn}
        onUserNotRegistered={handleOnUserNotRegistered}>
            <div>Loading...</div>
        </AuthProvider>)
}
export default ChooseUserView;