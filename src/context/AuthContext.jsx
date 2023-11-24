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
      });
      return () => unsubscribe();
    }, []);
  
    const logout = () => {
      return signOut(auth);
    };
  
    const info = { user, loading, signup, login, googleAuth, facebookAuth, logout };
  
    return <AuthProvider.Provider value={info}>{children}</AuthProvider.Provider>;
  };
  
  export default AuthContext;
  