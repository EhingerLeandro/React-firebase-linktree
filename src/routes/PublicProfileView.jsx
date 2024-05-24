import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import { existsUsername, getProfilePhotoUrl, getUserPublicProfileInfo } from "../firebase/firebase";
import {PublicLink} from "../components/PublicLink";
import "../routes/PublicProfileView.css"

const PublicProfileView = () =>{
    const params = useParams();
    const [currentProfile, setCurrentProfile] = useState(null);
    const [currentUrl, setCurrentUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentState, setCurrentState] = useState();
    const navigate = useNavigate()

    useEffect(()=>{
        async function getProfile(){
            setLoading(true);
            const username = params.username;
            console.log(username)
            try{
                const userUid = await existsUsername(username);
                console.log(userUid)
                if(userUid){
                    const userInfo = await getUserPublicProfileInfo(userUid);
                    
                    setCurrentProfile(userInfo);
                    console.log(userInfo);

                    const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
                    setCurrentUrl(url);
                }else{
                    setCurrentState(7);
                }
            }catch(error ){
                console.log(error);
            }
            finally{setLoading(false);}
        }
        getProfile();
    }, [params])
    console.log(currentProfile)

    const onHome = ()=>{
        navigate("/");
    }

    if(currentState === 7){
        return(
            <div>
                <h2 style={{textAlign:"center"}}>Username does not exist</h2>
            </div>
        )
    }

    return(
        loading? <h2 style={{textAlign:"center"}}>loading...</h2>:
        <div className="publicContainer">
            <h2 style={{textAlign:"center"}}>{currentProfile?.profileInfo.username}</h2>
            <button className="buttons" onClick={onHome}> Home Page</button>
            <div className="containProfile">
                <section>
                    <img src={currentUrl} style={{height:"35vh"}}/>
                </section>
                <section className="linkSection">
                    <div style={{fontWeight:"bolder"}}>Links</div>
                    {currentProfile?.linksInfo.map( link=>(
                    <PublicLink key={link.docId} title={link.title} url={link.url}/>
                    ))}
                </section>
            </div>
        </div>
    )
}
export default PublicProfileView;