import  { useContext, useEffect, useState } from 'react'
import './RequestModal.css'
import { useNavigate } from 'react-router-dom'



export const RequestModal = () => {

  const navigate = useNavigate();

  const closeModal = () => {
    navigate('/allusers');
  }
  
  return (
    <div className='modalContainer'>
    <form className='formApp requestModal'>
    <fieldset>
        <label htmlFor="project">Project</label>
        <select 
          className='selectModal'
          id='project'
          type="text" 
          placeholder='type'
          // value={project.type}
          // onChange={handleChange}
          name='type'
        >
          <option value={0} >project </option>
          <option value={0} >project </option>
          <option value={0} >project </option>
          <option value={0} >project </option>
        </select>
      </fieldset>
    <fieldset>
        <label htmlFor="project">Offer</label>
        <select 
          className='selectModal'
          id='project'
          type="text" 
          placeholder='type'
          // value={project.type}
          // onChange={handleChange}
          name='type'
        >
          <option value={0} >offer </option>
          <option value={0} >offer </option>
          <option value={0} >offer </option>
          <option value={0} >offer </option>
        </select>
      </fieldset>

     <div className='buttons'>
      <button className='accept'>Send</button>
      <button className='cancel' onClick={closeModal}>Cancel</button>
      </div>
    </form>
    </div>
  )
}
