import {useState, useRef} from "react";
import {DashboardWrapper} from "../components/DashboardWraper";
import {AuthProvider} from "../components/AuthProvider";
import {useNavigate, Link} from "react-router-dom";
import { setUserProfilePhoto, getProfilePhotoUrl, updateUser } from "../firebase/firebase";
import "./EditProfileView.css";

function EditProfileView (){
    const [currentState, setCurrentState] = useState(0); 
    const [currentUser, setCurrentUser] = useState({});
    const [profileUrl, setProfileUrl] =useState(null);
    const navigate = useNavigate();
    const fileRef = useRef(null);

    async function handleUserLoggedIn(user){
        setCurrentUser(user);
        const url = await getProfilePhotoUrl(user.profilePicture);
        setProfileUrl(url);
        setCurrentState(2); 
    }
    function handleOnUserNotLoggedIn(){
        navigate("/login");
    }
    function handleOnUserNotRegistered(){
        navigate("/login");
    }
    function handleFilePicker (){
         if(fileRef.current){
            fileRef.current.click()
         }
    }
    function handleChangeFile(e){
        const files = e.target.files;
        const fileReader = new FileReader();

        if ( fileReader && files && files.length>0){
            fileReader.readAsArrayBuffer(files[0]);
            fileReader.onload = async function(){
                const imageData = fileReader.result;
                const res = await setUserProfilePhoto(currentUser.uid, imageData);
                if(res){
                    const tempUser = currentUser;
                    tempUser.profilePicture =  res.metadata.fullPath;
                    await  updateUser(tempUser);
                    setCurrentUser(tempUser);
                    const url = await getProfilePhotoUrl(currentUser.profilePicture);
                    setProfileUrl(url);
                }
            }
        }
    }

    const publicProfile= `/u/${currentUser.username}`;

    if(currentState === 2){
        return(
            <DashboardWrapper >
                <div className="title1">Username: {currentUser.username}</div>
                <div className="title3">Your public Link Tree is:  
                    <Link to={publicProfile}>
                        <a> /u/{currentUser.username}</a>
                    </Link>
                </div>
                <div>
                    <img src={profileUrl} alt="imagen perfil" width={100}/>
                </div>
                <div>
                    <button onClick={handleFilePicker} className="buttons">Choose new profile picture</button>
                    <input ref={fileRef} style={{display:"none"}} onChange={handleChangeFile}type="file" />
                </div>
            </DashboardWrapper>
        )
    }

    return(
        <AuthProvider  onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleOnUserNotLoggedIn}
        onUserNotRegistered={handleOnUserNotRegistered}>
           <h2 style={{textAlign:"center"}}> Loading...</h2>
        </AuthProvider>
    )
}
export default EditProfileView;