import { useEffect } from "react";
import { createContext, useState } from "react";
import { fetchData2 } from "../helpers/axiosHelper";


export const AgoraContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [projects, setProjects] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {  //should we add data or null before headers ??
        const res = await fetchData2('user/findUserById', 'get', null,  { Authorization: `Bearer ${token}` });
        console.log('res', res);
        
        if (res.length > 0) {
          // console.log("Fetched User:", res.data[0]);
          setUser(res[0]);
        }
      } catch (error) {
        console.log('fetchUser Context', error);
      }
  
    };

    

    const tokenLocal = localStorage.getItem('agoraToken');
    if (tokenLocal && !token) {
      setToken(tokenLocal);
    }

    if (token && !user) {
      fetchUser();
    }

  }, [token, user]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (user) {
          console.log("user.id  *******",user.user_id);
          
          const res = await fetchData2(`notification/userNotifications/${user.user_id}`, 
            'get', null, { Authorization: `Bearer ${token}` });
          console.log("Fetched Notifications:", res);
          setNotifications(res);
        }
      } catch (error) {
        console.log('fetchNotifications Context', error);
      }
    };
  
    fetchNotifications();
  }, [user]);

  const markNotificationAsRead = async (id) => {
    try {
      await fetchData2(`notification/markAsRead/${id}`, 'put', null, { Authorization: `Bearer ${token}` });
      const res = await fetchData2(`notification/userNotifications/${user.user_id}`, 'get', null, { Authorization: `Bearer ${token}` });
      setNotifications(res);
    } catch (error) {
      console.log('markNotificationAsRead Context', error);
    }
  };

  return (
    <AgoraContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        projects,
        setProjects,
        notifications,
        setNotifications,
        markNotificationAsRead,
      }}
    >
      {children}
    </AgoraContext.Provider>
  );
};