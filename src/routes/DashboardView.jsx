import {AuthProvider} from "../components/AuthProvider";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {DashboardWrapper} from "../components/DashboardWraper";
import {v4 as uuidv4} from "uuid";
import { insertNewLink } from "../firebase/firebase";
import {getLinks, updateLink, deleteLink} from "../firebase/firebase";
import { LinkComp } from "../components/LinkComp";
import "../routes/DashboardView.css";

function DashboardView (){
    const navigate = useNavigate()
    const [currentState, setCurrentState] = useState(0); 
    const [currentUser, setCurrentUser] = useState({});
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentUrl, setCurrentUrl] = useState("");
    const [list, setList] = useState([]);
 
    async function handleUserLoggedIn(user){
        setCurrentUser(user);
        setCurrentState(2);
        let resLinks = await getLinks(user.uid);
        setList([...resLinks]); 
    }
    function handleOnUserNotLoggedIn(){
        navigate("/login");
    }
    function handleOnUserNotRegistered(){
        navigate("/login");
    }
    console.log("dashboard");

    const addLink = () =>{
        if(currentTitle!==""&& currentUrl!==""){
            const newLink = {
                id: uuidv4(),
                title: currentTitle,
                url: currentUrl,
                uid: currentUser.uid
            }
            const res = insertNewLink(newLink);
            newLink.docId = res.id;
            setCurrentTitle("");
            setCurrentUrl("");
            setList([...list, newLink]);
        }
    }
    
    function handleOnSubmit(e){
        e.preventDefault();
        e.target["title"].value = "";
        e.target["url"].value = "";
        addLink();
    }

    function handleOnchange(e){
        const value = e.target.value; 
        if(e.target.name === "title"){
            setCurrentTitle(value);
        }
        if(e.target.name === "url"){
            if (!/^https?:\/\//i.test(value)) {
                setCurrentUrl(`https://${value}`);
        }else{
            setCurrentUrl(value);
        }
        }
    }

    async function handleUpdateLink(docId, title, url){
        const link = list.find(item=>item.docId === docId);
        link.title=title;
        link.url=url;
        await updateLink(docId, link);
    }

    async function handleDeleteLink(docId){
        await deleteLink(docId);
        const temp = list.filter(item=>item.docId!==docId);
        setList([...temp]);
    }

    if(currentState===2){
        return(
            <DashboardWrapper>
                <div className="title">Dashboard: {currentUser.username}</div> 
                <form className="form" onSubmit={handleOnSubmit}>
                    <label className="labelInput" htmlFor="title">Title</label>
                    <input className="labelInput fullWidth" type="text" name="title" onChange={handleOnchange}/>
                    <label className="labelInput">Url</label>
                    <input className="labelInput fullWidth" type="text" name="url" onChange={handleOnchange}/>
                    <input className="labelInput buttons fullWidth" style={{color:"#fff"}} id="submit" type="submit" value="Create New Link"/>
                </form>
                <div>
                    {list.map((item)=>(
                        <LinkComp  
                        key={item.docId} 
                        docId={item.docId} 
                        title={item.title} 
                        url={item.url}
                        onDelete={handleDeleteLink} 
                        onUpdate={handleUpdateLink}/>
                        )
                    )}
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
export default DashboardView;
