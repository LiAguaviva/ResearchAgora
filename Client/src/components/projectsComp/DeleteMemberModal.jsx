import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { fetchData2 } from '../../helpers/axiosHelper';
import { AgoraContext } from '../../context/ContextProvider';


export const DeleteMemberModal = ({closeDeleteMemberModal, deletemember}) => {


  return (
    
    <div className='modalContainer'>
        <form className='verificationModal'>
          <h4>Are you sure?</h4>
          <p>
            This action will delete the member.
          </p>
          <p>
          If you are sure you wish to continue with this action, click on the <span>Delete Account</span> button.
          </p>
          <p>
          If you would like to keep the member, click on the <span>Cancel</span> button.
          </p>
        <div className='buttons'>
          <button onClick={(e)=>deletemember(e)}>Delete Member</button>
          <button className='cancel' onClick={()=>closeDeleteMemberModal()}>Cancel</button>
        </div>
        </form>
    </div>

  )
}




