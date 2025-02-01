import React, { useEffect, useState } from "react";
import "./AllProjects.css";
import { fetchData2 } from "../../../helpers/axiosHelper";
import { AllProjectsCard } from "../../../components/projectsComp/AllProjectsCard";

export const AllProjects = () => {
  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [projects, setProjects] = useState([]);
  const [seeButton, setSeeButton] = useState(false);

  const fetchProjects = async () => {
    try {
      const result = await fetchData2(`project/allprojects`, "get");
      setProjects(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchprojects = async () => {
      if (skills.length === 0) {
        fetchProjects();
      }
    };
    fetchprojects();
    
    const interval = setInterval(() => {
      fetchprojects();
    }, 1000);
    return () => clearInterval(interval);
  }, [skills]);

  const handleKeyDownSkill = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        inputValueSkills.trim() !== "" &&
        inputValueSkills.trim().length > 1 &&
        /^[a-zA-Z0-9 ]+$/.test(inputValueSkills.trim())
      ) {
        setSkills([...skills, inputValueSkills.trim()]);
        setInputValueSkills("");
      }
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const clear = () => {
    setSkills([]);
    setSeeButton(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSeeButton(true);
    try {
      let data = { skills: skills.join(",") };
      if (!skills.length) {
        fetchProjects();
      } else {
        const result = await fetchData2(
          `project/findprojectbyskills`,
          "post",
          data
        );
        setProjects(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="containerPpal allProjectsPage">
      <div className="searchingTagContainer">
        <h2>All Projects</h2>
        <div className="tagsContainerCenter">
          {skills?.map((skill, index) => (
            <div key={index} className="tagDeleteable">
              {skill}
              <span
                onClick={() => removeSkill(index)}
                className="deleteBtn"
                // value={editUser?.skills ? editUser.skills : ''}
              >
                ×
              </span>
            </div>
          ))}
        </div>

        <input
          type="text"
          value={inputValueSkills}
          onChange={(e) => setInputValueSkills(e.target.value)}
          onKeyDown={handleKeyDownSkill}
          placeholder="Search by skills / key words"
        />

        <div className="buttons">
          {seeButton && <button onClick={clear}>Clear</button>}
          <button onClick={onSubmit}>Search</button>
        </div>

        <p className="searchResults">Search Results: {projects?.length}</p>
      </div>

      <div className="separatorThick" />

      {projects?.map((elem) => {
        return (
          <div className="allProjectsGallery" key={elem.project_id}>
            <AllProjectsCard elem={elem} />
            <div className="separatorProjects" />
          </div>
        );
      })}
    </section>
  );
};
