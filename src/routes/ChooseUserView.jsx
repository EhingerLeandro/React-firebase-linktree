import {AuthProvider} from "../components/AuthProvider";
import {useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import {existsUsername} from "../firebase/firebase";
import {updateUser} from "../firebase/firebase";
import "../index.css";
import "../App.css";

/*Estados predefinidos
2: login completo
3: Login pero sin registro
4: No estas logueado
5: Ya existe username
6: Nuevo username, click para continuar 
7: User doesn't exist */

const ChooseUserView = () =>{
    const navigate = useNavigate();
    const [currentState, setCurrentState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [inputUsername, setInputUsername] = useState("");

    function handleUserLoggedIn(){
        navigate("/dashboard");
    }
    function handleOnUserNotLoggedIn(){
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
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <h2>Welcome {currentUser.displayName}</h2>
                <div>You are Logged in, but you aren't registered.</div>
                <p>To finish, please write your username.</p>
                {currentState===5? <p style={{color:"red"}}>This username already exists, please choose another:</p>:""}
                <div style={{marginBottom:"10px"}}>
                    <input type="text" onInput={handleInputUsername}/>
                </div>
                <div>
                    <button className="buttons" onClick={handleContinue}>Continue</button>
                </div>
            </div>
        )
    }

    if(currentState===6){
        return(
            <div className="containContinue">
                <h2>Congratulations now you can create your links</h2>
                <Link to="/dashboard"><button className="buttons">Continue</button></Link>
            </div>
        )
    }

    return (<AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleOnUserNotLoggedIn}
        onUserNotRegistered={handleOnUserNotRegistered}>
            <h2 style={{textAlign:"center"}}> Loading...</h2>
        </AuthProvider>)
}
export default ChooseUserView;