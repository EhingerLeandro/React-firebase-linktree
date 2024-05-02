import {AuthProvider} from "../components/AuthProvider";
import {useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import {DashboardWrapper} from "../components/DashboardWraper";

function DashboardView (){
    const navigate = useNavigate()
    const [currentState, setCurrentState] = useState(0); 
    const [currentUser, setCurrentUser] = useState({});

    function handleUserLoggedIn(user){
        setCurrentUser(user);
        setCurrentState(2);
    }
    function handleOnUserNotLoggedIn(user){
        navigate("/login");
    }
    function handleOnUserNotRegistered(user){
        navigate("/login")
    }

    function handleOnSubmit(e){
        e.preventDefault();
    }

    if(currentState===2){
        return(
            <DashboardWrapper>
                <h2>Dahsboard: {currentUser.username}</h2>
                <form onSubmit={handleOnSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title"/>

                    <label>Url</label>
                    <input type="text" name="url"/>

                    <input type="submit" value="Create New Link"/>
                </form>
            </DashboardWrapper>
            
        )
    }

    return(
        <AuthProvider  onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleOnUserNotLoggedIn}
        onUserNotRegistered={handleOnUserNotRegistered}>
            Loading...
        </AuthProvider>
    )
}
export default DashboardView;
