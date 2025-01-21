import { useState } from "react";

const SkillsInput = ({ onSubmit }) => {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "" && inputValue.trim().length !== 1) {
      e.preventDefault();
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };
  

  const handleSubmit = () => {
    const skillsString = skills.join(",");
    onSubmit(skillsString);
  };

  return (
    <div className="myform">
      <fieldset className="textareaLit">
        <label htmlFor="skills">Skills</label>
        <div className="tagsContainer">
          {skills.map((skill, index) => (
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Añade una skill y pulsa Enter"
          />
      <button onClick={handleSubmit} style={styles.submitBtn}>
        Accept
      </button>
      </fieldset>
    </div>
  );
};

export default SkillsInput;
