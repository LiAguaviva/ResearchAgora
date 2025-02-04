import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating';
import { fetchData2 } from '../../helpers/axiosHelper';
import { AgoraContext } from '../../context/ContextProvider';


const handleRatingSubmit = (rating) => {
};

export const DeleteAccountModal = ({closeModal, }) => {
  const navigate = useNavigate();
  const {user, token, setUser, setToken} = useContext(AgoraContext)


  const logOut = () => {
    localStorage.removeItem('agoraToken')
    setUser();
    setToken();
  }
  
  const handleDelete = async (e) => {
    e.preventDefault()
     
     try {
       let result = await fetchData2(`user/deleteUser/${user.user_id}`, "put", null, { Authorization: `Bearer ${token}` })
        console.log('handle delte',result);
        navigate("/") 
        //  setUser(null);
        logOut();
       
     } catch (error) {
       console.log(error);
     }
   }
  

  return (
    
    <div className='modalContainer'>
        <form className='verificationModal'>
          <h4>Are you sure?</h4>
          <p>
            This action will delete your account.
          </p>
          <p>
          If you are sure you wish to continue with this action, click on the <span>Delete Account</span> button.
          </p>
          <p>
          If you would like to keep your account active, click on the <span>Cancel</span> button.
          </p>
        <div className='buttons'>
          <button onClick={handleDelete}>Delete Account</button>
          <button className='cancel' onClick={closeModal}>Cancel</button>
        </div>
        </form>
    </div>

  )
}




