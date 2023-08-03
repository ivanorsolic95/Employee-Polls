import { useSelector } from "react-redux";
import "../css/Leaderboard.css";
const Leaderboard = () => {
  const users = useSelector((state) =>
    Object.values(state.users).sort(
      (a, b) =>
        Object.keys(b.answers).length +
        b.questions.length -
        (Object.keys(a.answers).length + a.questions.length)
    )
  );

  return (
    <div className="Leaderboard">
      <h1>Leaderboard</h1>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <span>{user.name}</span>
                <br />
                <img src={user.avatarURL} alt="User" />
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
