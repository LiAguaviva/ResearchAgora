import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './TagsCard.css'
import { AgoraContext } from '../../../context/ContextProvider'
const urlUser = import.meta.env.VITE_SERVER_URL_USER;


export const TagsCard = () => {

  const {user} = useContext(AgoraContext)

  const [fields, setFields] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const fetchSkillsAndFields = async () => {
      try {
        const res = await axios.post(
          `${urlUser}/getskills&fields`,
          { id: user.user_id }
        );
        setSkills(res?.data[0]?.skills?.split(",") ? res?.data[0]?.skills.split(",") : []);
        setFields(res?.data[0]?.fields?.split(",") ? res?.data[0]?.fields.split(",") : []);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?.user_id) {
      fetchSkillsAndFields();
    }
  }, [user]);

  return (
    <section className='tagsCard'>
      {fields.length > 0 && 
      <div className="tagsCardSect">
        <h4>Fields</h4>
          <div className="tagsContainer">
            {fields.map((field, index) => (
              <div key={index} className="">
                {field}
                {index < fields.length - 1 && <span> / </span>}
              </div>
            ))}
          </div>
        </div>}
        
            
      {skills.length > 0 &&
        <div className="tagsCardSect">
              <h4>Skills</h4>
              <div className="tagsContainer">
                {skills.map((skill, index) => (
                  <div key={index} className='tag'>
                    {skill}
                    <span
                      className="deleteBtn"
                      value={skill}
                    >
                    </span>
                  </div>
                ))}
              </div>
            </div>}
    </section>
  )
}
