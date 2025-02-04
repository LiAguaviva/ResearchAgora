import React, { useEffect, useState } from "react";
import { fetchData2 } from "../../../helpers/axiosHelper";
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
  const [seeButton, setSeeButton] = useState(false)

  const showRequestModal = (userId = null) => {
    if (userId) {
      setSelectedUserId(userId);
      setModalShowed(true);
    } else {
      setModalShowed(false);
    }
  };

  const clear = () => {
    setSkills([]);
    setInputValueName('')
    setSeeButton(false)
  }


  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const result = await fetchData2(
        `user/allUsers`,
        "get"
      );
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchusers = async() => {

      if (skills.length === 0){
        fetchUsers()
      }
    }
    fetchusers();
  }, [skills])

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

  const onSubmit = async (e) => {
    
    e.preventDefault();
    try {
      let data = {
        skills: skills.length ? skills.join(",") : null,
        name: inputValueName.trim() ? inputValueName.trim() : null,
      };
      setSeeButton(true)
      if (!skills.length && !inputValueName.trim()) {
        fetchUsers();
      } else {
        const result = await fetchData2(
          `user/findUsersBySkills`,
          "post",
          data
        );
        setUsers(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          placeholder="Search by skills / key words"
        />

        <input
          type="text"
          value={inputValueName}
          onChange={(e) => setInputValueName(e.target.value)}
          placeholder="Search by name"
        />

        <div className="buttons">
        {seeButton && <button onClick={clear}>Clear</button>}
        <button onClick={onSubmit}>Search</button>
        </div>

        <p className="searchResults">Search Results: {users?.length}</p>
      </div>

      <div className="separatorThick" />

      {users?.map((elem) => (
        <div className="allProjectsGallery" key={elem.user_id}>
          {elem.user_name &&
          <>
            <UserAllUsersCard showRequestModal={() => showRequestModal(elem.user_id)} elem={elem}/>
            <div className="separatorProjects" />
          </>}
        </div>
      ))}

      {modalShowed && <RequestModal showRequestModal={showRequestModal} selectedUserId={selectedUserId} />}

      </section>
  )
}
