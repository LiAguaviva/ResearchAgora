// eslint-disable react-refresh/only-export-components 

import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from 'axios';


export const AgoraContext = createContext();

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [projects, setProjects] = useState();


  useEffect(() => {

    const fetchUser = async (token) => {
      try {
        const res = await axios.get('http://localhost:4000/api/user/findUserById', {headers:{Authorization:`Bearer ${token}`}})
        
        setUser(res.data[0])
      } catch (error) {
        console.log('fetchUser Context', error);        
      }
    }

    const tokenLocal = localStorage.getItem('agoraToken');
    if (tokenLocal){
      fetchUser(tokenLocal)
      setToken(tokenLocal)
    }
  }, [])

  console.log('user en context', user);
  

 return (
  <AgoraContext.Provider value={{
   user, 
   setUser, 
   token, 
   setToken,
   projects,
   setProjects }}>
     {children}
  </AgoraContext.Provider>
 )

}