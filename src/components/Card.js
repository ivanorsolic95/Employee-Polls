import { Link } from "react-router-dom";
import "../css/Card.css";

const Card = ({ question, author }) => {
  return (
    <Link to={`/questions/${question.id}`}>
      <div className="card">
        <h1>{author.name}</h1>
        <p>{new Date(question.timestamp).toLocaleString()}</p>
        <div>
          <button>Show</button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
