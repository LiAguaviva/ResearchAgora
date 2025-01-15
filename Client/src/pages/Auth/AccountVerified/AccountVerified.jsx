import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataValidation } from '../../../helpers/axiosHelper';

export const AccountVerified = () => {
   const { token } = useParams();
   console.log("hhhhh", token);
    
  useEffect(() => {
    const fetchUser = async() => {
      try {
        const res = await fetchDataValidation ('http://localhost:4000/api/user/'+"verifyAccount/"+token, "get")
      } catch (error) {
        console.log(error);  
      }
    }
    fetchUser();
  }, [])
  

  return (
    <section>
      <div className=''>AccountVerified</div>
    </section>
  )
}
