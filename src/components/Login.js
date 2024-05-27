import { handleLogin } from "../actions/authedUser";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import "../css/Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [loginError, setLoginError] = useState(false);
  const { state } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  }

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
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  placeholder="Username"
                  onChange={handleUsername}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  value={password}
                  onChange={handlePassword}
                  id="password"
                  name="password"
                  type={type}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleToggle}>
                  <Icon icon={icon} size={25} />
                </span>
              </div>
            </div>

            <div>
              <button
                data-testid="login-button"
                type="submit"
                disabled={!username || !password}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              {loginError && <p className="text-red-600 mt-2">Wrong username or password, please try again!</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

