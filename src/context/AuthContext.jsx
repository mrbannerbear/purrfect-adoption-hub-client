/* eslint-disable react/prop-types */
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    FacebookAuthProvider,
    signOut,
  } from "firebase/auth";
  import auth from "../../firebase/firebase.config";
  import { createContext, useEffect, useState } from "react";
import axios from "axios";

  
  export const AuthProvider = createContext();
  
  const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const signup = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const login = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };

    const gProvider = new GoogleAuthProvider()

    const googleAuth = () => {
        setLoading(true)
        return signInWithPopup(auth, gProvider)
      }

      const fbProvider = new FacebookAuthProvider();

      const facebookAuth = () => {
        setLoading(true)
        return signInWithPopup(auth, fbProvider)
      }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        const loggedUser = { email: user?.email }
        if(user){
            axios.post("http://localhost:4200/jwt", loggedUser, { withCredentials: true })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        }
        else{
            axios.post("http://localhost:4200/logout", loggedUser, {
                withCredentials: true
            })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        }
      });
      return () => unsubscribe();
    }, [user]);
  
    const logout = () => {
      return signOut(auth);
    };
  
    const info = { user, loading, signup, login, googleAuth, facebookAuth, logout };
  
    return <AuthProvider.Provider value={info}>{children}</AuthProvider.Provider>;
  };
  
  export default AuthContext;
  