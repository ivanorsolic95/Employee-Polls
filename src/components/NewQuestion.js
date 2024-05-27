import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleAddQuestion } from "../actions/shared";
import { useNavigate } from "react-router-dom";
import "../css/NewQuestion.css";

const NewQuestion = () => {
  const dispatch = useDispatch();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const navigate = useNavigate();

  const handleOptionOne = (event) => {
    const value = event.target.value;
    setOptionOne(value);
  };

  const handleOptionTwo = (event) => {
    const value = event.target.value;
    setOptionTwo(value);
  };

  const handleNewQuestion = (event) => {
    event.preventDefault();
    dispatch(handleAddQuestion(optionOne, optionTwo));
    navigate("/");
  };

  return (
    <div className="new-question-container">
      <h1>Would you rather?</h1>
      <form onSubmit={handleNewQuestion} className="new-question-form">
        <div className="input-group">
          <label>Option One</label>
          <input
            value={optionOne}
            onChange={handleOptionOne}
            type="text"
            placeholder="Enter Option One"
          />
        </div>
        <div className="input-group">
          <label>Option Two</label>
          <input
            value={optionTwo}
            onChange={handleOptionTwo}
            type="text"
            placeholder="Enter Option Two"
          />
        </div>
        <button type="submit" className="submit-button">
          Create New Question
        </button>
      </form>
    </div>
  );
};

export default NewQuestion;
