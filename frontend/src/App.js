import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import useLocalStorage from "./hooks/useLocalStorage";
import Routes from "./Routes";
import CapstoneApi from "./api";
import UserContext from "./UserContext";
import AppNav from "./AppNav";

export const TOKEN_STORAGE_ID = "capstone-token";

export default function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };

  async function getCurrentUser() {
    try {
      let userId = token;
      let currentUser = await CapstoneApi.getCurrentUser(userId);
      setCurrentUser(currentUser);
    } catch (err) {
      setCurrentUser(null);
    }
    setInfoLoaded(true);
  }

  useEffect(() => {    
    setInfoLoaded(false);

    if(token){
      getCurrentUser();
    }
    else{
      setInfoLoaded(true);
    }
  }, [token]);

  
  if (!infoLoaded) {
    return <ClipLoader size={150} color="#123abc" />;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <AppNav logout={handleLogOut} />
      <Routes setToken={setToken} />
    </UserContext.Provider>
  );
};
