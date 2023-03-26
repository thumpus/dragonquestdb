import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import Router from "./Routes";
import UserContext from './auth/UserContext';
import useLocalStorage from "./hooks/useLocalStorage";
import { decodeJwt } from 'jose';
import DragonQuestApi from './api';
export const TOKEN_STORAGE_ID = "dragonquest-token"

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
 
 
  useEffect(function loadUserInfo(){

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeJwt(token);
          DragonQuestApi.token = token;
          let currentUser = await DragonQuestApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch(err){
          console.error("Problem loading user", err)
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    getCurrentUser();
  }, [token])
  

  async function signup(signupData) {
  try {
    let token = await DragonQuestApi.signup(signupData);
    setToken(token);
    DragonQuestApi.token = token;
    return { success: true };
  } catch (errors) {
    console.error("signup failed", errors);
    return { success: false, errors }
  }
  }

  async function login(loginData) {
    try {
      let token = await DragonQuestApi.login(loginData);
      setToken(token);
      DragonQuestApi.token = token;
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
    
  }

  if (!infoLoaded) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <NavBar />
      <Router login={login} signup={signup} logout={logout}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
