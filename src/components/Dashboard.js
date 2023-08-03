import { useSelector } from "react-redux";
import Card from "./Card";
import "../css/Dashboard.css";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) =>
    Object.values(state.questions).sort((a, b) => b.timestamp - a.timestamp)
  );
  const users = useSelector((state) => state.users);

  const [isToggle, setIsToggle] = useState(
    JSON.parse(localStorage.getItem("isToggle"))
  );

  useEffect(() => {
    localStorage.setItem("isToggle", JSON.stringify(isToggle));
  }, [isToggle]);

  const toggleChange = () => {
    setIsToggle(!isToggle);
  };

  const unanswered_questions = questions.filter(
    (question) =>
      !question.optionOne.votes.includes(authedUser) &&
      !question.optionTwo.votes.includes(authedUser)
  );

  const answered_questions = questions.filter(
    (question) =>
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
  );

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={toggleChange}>
        {isToggle ? "View answered polls" : "View unanswered polls"}
      </button>
      <div>
        <h2>{isToggle ? "Unanswered questions" : "Answered questions"}</h2>
        <ul>
          {isToggle
            ? unanswered_questions.map((question) => (
                <li key={question.id}>
                  <Card question={question} author={users[question.author]} />
                </li>
              ))
            : answered_questions.map((question) => (
                <li key={question.id}>
                  <Card question={question} author={users[question.author]} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
