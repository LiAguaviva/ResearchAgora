import React, { useContext, useEffect, useState } from 'react'
import { AgoraContext } from '../../context/ContextProvider'
import axios from 'axios'
import './TagsCard.css'

export const TagsCard = () => {
  const {user} = useContext(AgoraContext)

  const [fields, setFields] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const fetchSkillsAndFields = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/user/getskills&fields",
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
      <div className="tagsCardSect">
        <h4>Fields</h4>
          <div className="tagsContainer">
            {fields.map((field, index) => (
              <div key={index} className='tag'>
                {field}
                <span
                  className="deleteBtn"
                  value={field}
                >
                </span>
              </div>
            ))}
          </div>
        </div>
            
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
            </div>
            
            
    </section>
  )
}
