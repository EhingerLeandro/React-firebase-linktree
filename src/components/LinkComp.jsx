import {useState, useRef, useEffect} from "react";
import "../components/LinkComp.css";

export function LinkComp({docId, title, url, onDelete, onUpdate}){

    const [currentTitle, setCurrentTitle]  =useState(title);
    const [currentUrl, setCurrentUrl]  =useState(url);

    const[editTitle, setEditTitle] = useState(false);
    const[editUrl, setEditUrl] = useState(false);

    const titleRef = useRef(null);
    const urlRef = useRef(null);

    useEffect(()=>{
        if(titleRef.current){
            titleRef.current.focus();
        }
    },[editTitle])

    useEffect(()=>{
        if(urlRef.current){
            urlRef.current.focus();
        }
    },[editUrl])

   function handleEditTitle(){
        setEditTitle(true);}
   function handleEditUrl(){
        setEditUrl(true);}

   function handleChangeTitle(e){
        setCurrentTitle(e.target.value)}
   function handleChangeUrl(e){
        setCurrentUrl(e.target.value)}

   function handleTitleBlur(){
        setEditTitle(false);
        onUpdate(docId, currentTitle, currentUrl);}
   function handleUrlBlur(){
        let recentURL;
        if (!/^https?:\/\//i.test(currentUrl)) {
                recentURL = `https://${currentUrl}` 
                setCurrentUrl(recentURL);
        }
        setEditUrl(false);
        onUpdate(docId, currentTitle, recentURL);}
    
    function handleDelete(){
        onDelete(docId);
    }

    return(
        <div key={docId} id="card-link"> 
            <div >
                {editTitle?
                <input ref={titleRef} type="text" className="labelInput"
                value={currentTitle} onChange={handleChangeTitle}
                onBlur={handleTitleBlur}/>:
                <><button className="labelInput buttons" onClick={handleEditTitle}>Edit Title</button>{currentTitle}</>
                }
            </div>
            <div >
                {editUrl?
                <input ref={urlRef} type="text" className="labelInput" 
                value={currentUrl} onChange={handleChangeUrl} 
                onBlur={handleUrlBlur}/>:
                <><button className="labelInput buttons" onClick={handleEditUrl}>Edit Url</button>
                <a target={"blank"} href={currentUrl}>{currentUrl}</a> </>
                } 
            </div>
            <button className="labelInput buttons" onClick={handleDelete}>Delete</button>
        </div>
    )
}