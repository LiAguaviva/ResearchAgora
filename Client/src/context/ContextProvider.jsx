// eslint-disable react-refresh/only-export-components 

import { createContext, useState } from "react";

export const AgoraContext = createContext();

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [projects, setProjects] = useState();


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