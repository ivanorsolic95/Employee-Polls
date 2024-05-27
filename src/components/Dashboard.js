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
      <div className="flex justify-center mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out" onClick={toggleChange}>
          {isToggle ? "View answered polls" : "View unanswered polls"}
        </button>
      </div>
      <div>
        <h2 className="status text-2xl font-semibold mb-4">{isToggle ? "Unanswered questions" : "Answered questions"}</h2>
        <ul role="list" className="lista grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isToggle
            ? unanswered_questions.map((question) => (
                <li key={question.id} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                  <Card question={question} author={users[question.author]} />
                </li>
              ))
            : answered_questions.map((question) => (
                <li key={question.id} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                  <Card question={question} author={users[question.author]} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
