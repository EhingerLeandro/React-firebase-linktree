
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, collection, getDocs, doc, getDoc, 
        query, where, addDoc, setDoc, deleteDoc} from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_APPID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENTID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function userExists (uid){
  const docRef = doc(db, "users", uid);
  const res= await getDoc(docRef);
  return res.exists();
}

export async function existsUsername(userParam){
  const users=[];
  const docsRef= collection(db, "users");
  const q = query(docsRef, where("username", "==", userParam));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);

  querySnapshot.forEach(doc=>{
    users.push(doc.data());
  });
  console.log(users);
  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user){
  try{
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  }catch(error){
    console.log(error);
  }
}

export async function updateUser(user){
  try{
    const collectionRef= collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  }
  catch(error){
    console.log(error);
  }
}

export async function getUserInfo(uidParam){
  try{
    const docRef = doc(db, "users", uidParam);
    const document= await getDoc(docRef);
    return document.data();
  }catch(error){
    console.log(error);
  }
}

export async function insertNewLink (link){
  try{
    const docsRef = collection(db, "links");
    const res = await addDoc(docsRef, link);
    return res;
  }catch(error){
    console.error(error);
  }
}

export async function getLinks(uid){
  let links=[];
  try{
    const collectionRef= collection(db, "links");
    const q = query(collectionRef, where("uid", "==", uid))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc)=>{
      const link = {...doc.data()};
      link.docId = doc.id;
      links.push(link);
    });
    return links;

  }catch(error){
    console.error(error);
  }
} 

export async function updateLink(docId, link){
  try{
    const docRef = doc(db, "links", docId);
    const res = await setDoc(docRef, link);
    return res;
  }catch(error){
    console.error(error);
  }
}

export async function deleteLink(docId){
  try{
    const docRef = doc(db, "links", docId);
    const res = deleteDoc(docRef);
    return res
  }catch(error){
    console.error(error);
  }
}