import {useEffect, useState} from "react";
import {auth} from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
// import { userExists } from "../firebase/firebase";
import {useNavigate} from "react-router-dom";
import {AuthProvider} from "../components/AuthProvider.jsx";

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
    
    function handleUserLoggedIn(user){
        navigate("/dashboard");
    }
    function handleOnUserNotLoggedIn(user){
        setCurrentState(4);
    }
    function handleOnUserNotRegistered(){
        navigate("/choose-username");
    }

    if(currentState === 4){
        return(
            <div>
                <button onClick={handleClick}>Login with Google</button>
            </div>
        )
    }

    return <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleOnUserNotLoggedIn}
        onUserNotRegistered={handleOnUserNotRegistered}>
            <div>Loading...</div>
        </AuthProvider>
}
export default LoginView