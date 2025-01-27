import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from 'axios';

export const AgoraContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [projects, setProjects] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/user/findUserById', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.length > 0) {
          console.log("Fetched User:", res.data[0]);
          setUser(res.data[0]);
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
          
          const res = await axios.get(`http://localhost:4000/api/notification/userNotifications/${user.user_id}`);
          console.log("Fetched Notifications:", res.data);
          setNotifications(res.data);
        }
      } catch (error) {
        console.log('fetchNotifications Context', error);
      }
    };
  
    fetchNotifications();
  }, [user]);

  const markNotificationAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/notification/markAsRead/${id}`);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
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