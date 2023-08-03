import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/shared";
import { useEffect } from "react";
import "../css/Poll.css";

const Poll = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { authedUser, users, questions } = useSelector((state) => ({
    authedUser: state.authedUser,
    users: state.users,
    questions: state.questions,
  }));

  const question = Object.values(questions).find(
    (question) => question.id === id
  );

  useEffect(() => {
    if (!question) {
      navigate("/404");
    }
  }, [question, navigate]);

  if (!question) {
    return null;
  }

  const author = Object.values(users).find(
    (user) => user.id === question.author
  );

  const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const getSelectedOption = () => {
    if (hasVotedForOptionOne) {
      return "optionOne";
    } else if (hasVotedForOptionTwo) {
      return "optionTwo";
    } else {
      return null;
    }
  };

  const selectedOption = getSelectedOption();

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
  };

  const calculatePercentage = (option, question) => {
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const numberVotesTotal = optionOneVotes + optionTwoVotes;

    const percentage = (votes) =>
      ((votes / numberVotesTotal) * 100).toFixed(2) + " %";

    if (option === "optionOne") {
      return percentage(optionOneVotes);
    } else if (option === "optionTwo") {
      return percentage(optionTwoVotes);
    } else {
      return "";
    }
  };

  return (
    <div className="poll-container">
      <h1>Poll by {author.id}</h1>

      <div>
        <img src={author.avatarURL} alt="Profile" />
      </div>

      <div>
        <h2>Would you rather?</h2>
      </div>

      <div>
        <button onClick={handleOptionOne} disabled={hasVoted}>
          <div>
            <p>{question.optionOne.text}</p>
            {!hasVoted && <p>Click</p>}
            {hasVoted && (
              <p className={selectedOption === "optionOne" ? "selected" : ""}>
                Votes: {question.optionOne.votes.length} (
                {calculatePercentage("optionOne", question)})
              </p>
            )}
          </div>
        </button>

        <button onClick={handleOptionTwo} disabled={hasVoted}>
          <p>{question.optionTwo.text}</p>
          {!hasVoted && <p>Click</p>}
          {hasVoted && (
            <p className={selectedOption === "optionTwo" ? "selected" : ""}>
              Votes: {question.optionTwo.votes.length} (
              {calculatePercentage("optionTwo", question)})
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

export default Poll;
