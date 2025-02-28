import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBpID7Fr_hjbOUDp_O3eLdzXRt41BnJ4-8",
  authDomain: "cryptocurrency-a0ae5.firebaseapp.com",
  projectId: "cryptocurrency-a0ae5",
  storageBucket: "cryptocurrency-a0ae5.firebasestorage.app",
  messagingSenderId: "932878858996",
  appId: "1:932878858996:web:0063d9d0f037a8186f3ca1",
  measurementId: "G-YG9R85Z5T6"
};

// Initialize Firebase, authentication and database
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user= res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email, 
        })
    }catch(error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email,password)=>{
      try {
        await signInWithEmailAndPassword(auth,email,password);
      } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
      }
}
const logout = async ()=>{
    signOut(auth);
}
export {auth,db,login,signUp,logout};