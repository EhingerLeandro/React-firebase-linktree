import {useEffect, useState} from "react";
import {auth} from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { userExists } from "../firebase/firebase";
import { registerNewUser } from "../firebase/firebase";
import { getUserInfo } from "../firebase/firebase";

export const AuthProvider = ({children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered}) => {
    useEffect(()=>{
        /*In this next part the method onAuth... uses a function that
         has been created (handleUser...), which also works with 
         a parameter called "user", this parameter somehow takes all 
         the information from onAuth*/
        onAuthStateChanged(auth, async(user)=>{
            if(user){
                const isRegistered = await userExists(user.uid);
                console.log(isRegistered)
                if(isRegistered){
                    const userInfo = await getUserInfo(user.uid);
                    if(userInfo.processCompleted){
                        onUserLoggedIn(userInfo);
                    }else{
                        onUserNotRegistered(userInfo);
                    }
                    console.log(user)
                    
                }else{
                    console.log(user);
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: "",
                        username:"",
                        processCompleted: false

                    });      
                    onUserNotRegistered(user);
                }
            }else {
                console.log(user)
                onUserNotLoggedIn();
            }
        })
    },[onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

    return <div>{children}</div>
}
