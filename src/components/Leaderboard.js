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
    <div className="main-container">
      <div className="table-container">
        <div className="wrapping-container">
          <div className="inside-wrapping-container">
            <table id="table">
              <thead>
                <tr>
                  <th scope="col" id="name-cell">
                    Name
                  </th>
                  <th scope="col" className="cell">
                    Answered
                  </th>
                  <th className="cell">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody id="table-body">
                {users.map((user => (
                  <tr key={user.id}>
                    <td id="data-cell-user">
                      <div id="user-div">
                        <div id="image-wrapper">
                          <img id="user-avatar" src={user.avatarURL} alt="User"/>
                        </div>
                        <div id="username-wrapper">
                          <div id="username-text">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="data-cell">
                      <div id="answers">{Object.keys(user.answers).length}</div>
                    </td>
                    <td className="data-cell">
                      <div id="questions">{user.questions.length}</div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
