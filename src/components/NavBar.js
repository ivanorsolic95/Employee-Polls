import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleLogout } from "../actions/authedUser";
import "../css/NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    dispatch(handleLogout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link className="navbar-link" to="/">
          HomePage
        </Link>
        <Link className="navbar-link" to="/leaderboard">
          Leaderboard
        </Link>
        <Link className="navbar-link" to="/add">
          New Poll
        </Link>
      </div>
      <div className="user-info">
        <div className="user-info-text"> User: {authedUser} </div>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
