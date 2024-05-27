import { Link } from "react-router-dom";
import "../css/Card.css";

const Card = ({ question, author }) => {
  return (
    <Link to={`/questions/${question.id}`}>
      <div className="flex flex-1 flex-col p-8">
      <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={author.avatarURL} alt="" />
      <h3 className="mt-6 text-sm font-medium text-gray-900">{author.name}</h3>
      <dl className="mt-1 flex flex-grow flex-col justify-between">
        <dt className="sr-only">Title</dt>
        <dd className="text-sm text-gray-500">{new Date(question.timestamp).toLocaleString()}</dd>
        <dt className="sr-only">Role</dt>
        <dd className="mt-3">
        </dd>
      </dl>
    </div>
    <div>
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="flex w-0 flex-1">
        </div>
        <div className="-ml-px flex w-0 flex-1">
        </div>
      </div>
    </div>
  </Link> 
  );
};

export default Card;
