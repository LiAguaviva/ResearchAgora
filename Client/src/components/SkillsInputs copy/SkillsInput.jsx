import { useState } from "react";

const SkillsInputOriginal = ({ onSubmit }) => {
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
    <div>
      <div style={styles.container}>
        {skills.map((skill, index) => (
          <div key={index} style={styles.tag}>
            {skill}
            <span onClick={() => removeSkill(index)} style={styles.removeBtn}>
              ×
            </span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Añade una skill y pulsa Enter"
          style={styles.input}
        />
      </div>
      <button onClick={handleSubmit} style={styles.submitBtn}>
        Enviar
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
    minHeight: "40px",
  },
  tag: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    margin: "5px",
    display: "flex",
    alignItems: "center",
  },
  removeBtn: {
    marginLeft: "8px",
    cursor: "pointer",
  },
  input: {
    border: "none",
    outline: "none",
    padding: "5px",
    flex: "1",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SkillsInput;
