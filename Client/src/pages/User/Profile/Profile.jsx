import { useEffect, useState } from 'react'
import { ProfileUserCard } from '../../../components/ProfileUserCard/ProfileUserCard'
import { PersonalData } from '../../../components/PersonalData/PersonalData'
import { ProjectProfileCard } from '../../../components/ProjectProfileCard/ProjectProfileCard'
import { ReviewCard } from '../../../components/ReviewCard/ReviewCard'
import { UserCard } from '../../../components/UserCard/UserCard'
import StatsRadarChart from '../../../components/RadarGraph/RadarGraph'
import { useContext } from 'react'
import { AgoraContext } from '../../../context/ContextProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {

  const {user} = useContext(AgoraContext)
  const navigate = useNavigate()
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
    <>
    <section>
    <div className='containerPpal'>
      <ProfileUserCard />
    </div>

    <div className='containerPpal'>
      <StatsRadarChart />
    </div>

    <fieldset className="textareaLit">
        <label htmlFor="skills">Skills</label>
        <div className="tagsContainer">
          {skills.map((skill, index) => (
            <div key={index} className="tag">
              {skill}
              <span
                className="deleteBtn"
                value={skill}
              >
              </span>
            </div>
          ))}
        </div>
      </fieldset>
      <fieldset className="textareaLit">
        <label htmlFor="fields">Fields</label>
        <div className="tagsContainer">
          {fields.map((field, index) => (
            <div key={index} className="tag">
              {field}
              <span
                className="deleteBtn"
                value={field}
              >
              </span>
            </div>
          ))}
        </div>
      </fieldset>

    <div className='containerPpal'>
      <PersonalData />
    </div>
    </section>

    <section>
      <div className='containerPpal'>
        <div className='projectsGallery'>
          <p>projects.map</p>
          <ProjectProfileCard />
        </div>
      </div>
      <button onClick={() => navigate('/createproject')}>Create New Project</button>
    </section>

    <section>
      <div className='containerPpal'>
        <UserCard />
      </div>
    </section>

    <section>
      <div className='containerPpal'>
        <div className='reviewGallery'>
          <ReviewCard />
        </div>
      </div>
    </section>
    </>
  )
}
