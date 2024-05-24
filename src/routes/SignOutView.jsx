import {useNavigate} from "react-router-dom";
import { AuthProvider } from "../components/AuthProvider";
import { SignOut} from "../firebase/firebase";


export default function SingOutView (){
    const navigate = useNavigate();

    function handleUserLoggedIn(){
        SignOut();
    }
    function handleOnUserNotLoggedIn(){
        navigate("/");
    }
    function handleOnUserNotRegistered(){
        navigate("/");
    }

    return (<AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleOnUserNotLoggedIn}
        onUserNotRegistered={handleOnUserNotRegistered}>
            <h2 style={{textAlign:"center"}}> Loading...</h2>
        </AuthProvider>)
}