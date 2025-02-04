import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { fetchData2 } from '../../helpers/axiosHelper';
import { AgoraContext } from '../../context/ContextProvider';


export const DeleteProjectModal = ({closeDeleteProjectModal, project}) => {

  const {token} = useContext(AgoraContext)
  const navigate = useNavigate();

  const deleteProject = async (e) => {
    e.preventDefault();
    console.log('deleteProjeeeeeeeeeect pleseeee');
    
    try {
      const result = await fetchData2(
        `project/deleteproject/${project[0].project_id}`, 
        'put', 
        null,  
        { Authorization: `Bearer ${token}`  
      })
      
      navigate('/profile')
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    
    <div className='modalContainer'>
        <form className='verificationModal'>
          <h4>Are you sure you want to delete the project?</h4>
          <p>
          If you are sure you wish to continue with this action, click on the <span>Delete Project</span> button.
          </p>
          <p>
          If you would like to keep the project, click on the <span>Cancel</span> button.
          </p>
        <div className='buttons'>
          <button onClick={deleteProject}>Delete Project</button>
          <button className='cancel' onClick={()=>closeDeleteProjectModal()}>Cancel</button>
        </div>
        </form>
    </div>

  )
}




