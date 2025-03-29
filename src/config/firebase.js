import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbVcjj-Momztktph9KcAaXqO1o7FHT10I",
  authDomain: "chat-app-gs2025.firebaseapp.com",
  projectId: "chat-app-gs2025",
  storageBucket: "chat-app-gs2025.firebasestorage.app",
  messagingSenderId: "505156029229",
  appId: "1:505156029229:web:02e66baddfba8532c8a1a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(username, email, password) => {
    try {
	const resp = await createUserWithEmailAndPassword(auth, email, password);
	const user = resp.user;
	await setDoc(doc(db, "users", user.uid), {
	    id:user.uid,
	    username:username.toLowerCase(),
	    email,
	    name: "",
	    avatar: "",
	    bio: "Hey, There I am using Chat App",
	    lastSeen: Date.now()
	});
	await setDoc(doc(db, "chats", user.uid), {
	    chatsData: []
	});
    } catch (error) {
	console.error(error);
	toast.error(error.code.split("/")[1].split('-').join(" "));
    }    
}

const login = async (email, password) => {
    try {
	await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
	console.error(error);
	toast.error(error.code.split("/")[1].split('-').join(" "));
    }
}

const logout = async() => {
    try {
	await signOut(auth);
    } catch (error) {
	console.error(error);
        toast.error(error.code.split("/")[1].split('-').join(" "));
    }
}

export {signup, login, logout, auth, db};
