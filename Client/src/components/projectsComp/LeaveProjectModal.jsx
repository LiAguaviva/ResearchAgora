import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { fetchData2 } from '../../helpers/axiosHelper';
import { AgoraContext } from '../../context/ContextProvider';


export const LeaveProjectModal = ({closeLeaveProjectModal, project}) => {

  const {user, token} = useContext(AgoraContext)

  const leaveProject = async(e) => {
    e.preventDefault();

    try {
      let data = {
                  userID: user.user_id,
                  user_id : user.user_id, 
                  project_id: project[0].project_id
                };
      
      let result = await fetchData2(
                  'project/deleteMember', 
                  'post', 
                  data,
                  { Authorization: `Bearer ${token}` }
                );

      // console.log('result leaceProjectModal', result);
      
      navigate('/profile')
      
    } catch (error) {
      console.log(error)
    }
    closeLeaveProjectModal();
  }
// console.log('user on leaveProjectModal', user);


  return (
    
    <div className='modalContainer'>
        <form className='verificationModal'>
          <h4>Are you sure you want to leave the project?</h4>
          <p>
          If you are sure you wish to continue with this action, click on the <span>Leave Project</span> button.
          </p>
          <p>
          If you would like to keep the member, click on the <span>Cancel</span> button.
          </p>
        <div className='buttons'>
          <button onClick={leaveProject}>Leave Project</button>
          <button className='cancel' onClick={()=>closeLeaveProjectModal()}>Cancel</button>
        </div>
        </form>
    </div>

  )
}




