import React, { useEffect, useState } from "react";
import { fetchDataValidation } from "../../../helpers/axiosHelper";
import { UserAllUsersCard } from "../../../components/usersComp/UserAllUsersCard";
import { RequestModal } from "../../../components/offerComps/RequestModal/RequestModal";
import { useNavigate } from "react-router-dom";

export const AllUsers = () => {
  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [inputValueName, setInputValueName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [modalShowed, setModalShowed] = useState(false);

  const showRequestModal = (userId = null) => {
    if (userId) {
      setSelectedUserId(userId);
      setModalShowed(true);
    } else {
      setModalShowed(false);
    }
  };
  

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const result = await fetchDataValidation(
        "http://localhost:4000/api/user/allUsers",
        "get"
      );
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleKeyDownSkill = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        inputValueSkills.trim() !== "" &&
        inputValueSkills.trim().length > 1 &&
        /^[a-zA-Z0-9]+$/.test(inputValueSkills.trim())
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        skills: skills.length ? skills.join(",") : null,
        name: inputValueName.trim() ? inputValueName.trim() : null,
      };

      if (!skills.length && !inputValueName.trim()) {
        fetchUsers();
      } else {
        const result = await fetchDataValidation(
          "http://localhost:4000/api/user/findUsersBySkills",
          "post",
          data
        );
        console.log("result: ", result);
        setUsers(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('TODOS LOS USUARIOS',users)

  return (
    <section className="containerPpal allProjectsPage">
      <div className="searchingTagContainer">
        <h2>All Researchers</h2>

        <div className="tagsContainerCenter">
          {skills?.map((skill, index) => (
            <div key={index} className="tagDeleteable">
              {skill}
              <span onClick={() => removeSkill(index)} className="deleteBtn">
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
          placeholder="Add skills / key words for searching"
        />

        <input
          type="text"
          value={inputValueName}
          onChange={(e) => setInputValueName(e.target.value)}
          placeholder="Search by name"
        />

        <button onClick={onSubmit}>Search</button>

        <p className="searchResults">Search Results: {users?.length}</p>
      </div>

      <div className="separatorThick" />

      {users?.map((elem) => (
        <div className="allusersGallery" key={elem.user_id}>
          <UserAllUsersCard showRequestModal={() => showRequestModal(elem.user_id)} elem={elem}/>
          <div className="separatorAllProjects" />
        </div>
      ))}

      {modalShowed && <RequestModal showRequestModal={showRequestModal} selectedUserId={selectedUserId} />}

      </section>
  )
}
