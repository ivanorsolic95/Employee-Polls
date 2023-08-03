import { handleLogin } from "../actions/authedUser";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { state } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && password) {
      const success = await dispatch(handleLogin(username, password));
      if (success) {
        setUsername("");
        setPassword("");
        navigate(state?.path || "/");
      } else {
        setUsername("");
        setPassword("");
        setLoginError(true);
      }
    }
  };

  useEffect(() => {
    if (loginError) {
      const timeout = setTimeout(() => {
        setLoginError(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [loginError]);

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          value={username}
          placeholder="Username"
          onChange={handleUsername}
          type="text"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={handlePassword}
          type="password"
          placeholder="Password"
        />
        <button
          data-testid="login-button"
          type="submit"
          disabled={!username || !password}
        >
          Login
        </button>
        {loginError && <p>Wrong username or password, please try again!</p>}
      </form>
    </div>
  );
};

export default Login;
