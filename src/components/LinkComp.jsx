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
        setEditUrl(false);
        onUpdate(docId, currentTitle, currentUrl);}
    
    function handleDelete(){
        onDelete(docId);
    }

    return(
        <div key={docId} id="card-link"> 
            <div>
                {editTitle?
                <input ref={titleRef} type="text" 
                value={currentTitle} onChange={handleChangeTitle}
                onBlur={handleTitleBlur}/>:
                <><button onClick={handleEditTitle}>Edit Title</button>{currentTitle}</>
                }
            </div>
            <div>
                {editUrl?
                <input ref={urlRef} type="text" 
                value={currentUrl} onChange={handleChangeUrl} 
                onBlur={handleUrlBlur}/>:
                <><button onClick={handleEditUrl}>Edit Url</button>
                <a href={url}>{currentUrl}</a> </>
                } 
            </div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}