import {AuthProvider} from "../components/AuthProvider";
import {useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import {DashboardWrapper} from "../components/DashboardWraper";
import {v4 as uuidv4} from "uuid";
import { insertNewLink } from "../firebase/firebase";
import {getLinks, updateLink, deleteLink} from "../firebase/firebase";
import { LinkComp } from "../components/LinkComp";

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
        }
    }
    console.log(list);
    
    function handleOnSubmit(e){
        e.preventDefault();
        addLink();
    }

    function handleOnchange(e){
        const value = e.target.value; 
        if(e.target.name === "title"){
            setCurrentTitle(value);
        }
        if(e.target.name === "url"){
            setCurrentUrl(value);
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
                <h2>Dahsboard: {currentUser.username}</h2>
                <form onSubmit={handleOnSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" onChange={handleOnchange}/>
                    <label>Url</label>
                    <input type="text" name="url" onChange={handleOnchange}/>
                    <input id="submit" type="submit" value="Create New Link"/>
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
            Loading...
        </AuthProvider>
    )
}
export default DashboardView;
