import { useState} from "react";
import {auth} from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// import { userExists } from "../firebase/firebase";
import {useNavigate} from "react-router-dom";
import {AuthProvider} from "../components/AuthProvider.jsx";
import google_icon from "../images/google_icon.png";
import style from "../routes/loginView.module.css";

function LoginView (){
    const navigate = useNavigate();
    // const [currentUser, setCurrentUser] = useState(null);
    const [currentState, setCurrentState] = useState(0);

    //This part is activated when the button is clicked.
    async function handleClick (){
        async function signInWithGoogle (googleProv){
            try{
                const res = await signInWithPopup(auth, googleProv)
                console.log(res);
            }catch(error){
                console.log(error);
            }
        }
        const googleProvider = new GoogleAuthProvider();
        signInWithGoogle(googleProvider)
    }
    
    function handleUserLoggedIn(){
        navigate("/dashboard");
    }
    function handleOnUserNotLoggedIn(){
        setCurrentState(4);
    }
    function handleOnUserNotRegistered(){
        navigate("/choose-username");
    }

    console.log("loginView");

    if(currentState === 4){
        return(
            <div className={style.signGoogle}>
                <img style={{width:"10vw", margin:"5%"}} src={google_icon}/>
                <button className="buttons" onClick={handleClick}>Login with Google</button>
            </div>
        )
    }

    return <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleOnUserNotLoggedIn}
        onUserNotRegistered={handleOnUserNotRegistered}>
            <h2 style={{textAlign:"center"}}> Loading...</h2>
        </AuthProvider>
}
export default LoginView