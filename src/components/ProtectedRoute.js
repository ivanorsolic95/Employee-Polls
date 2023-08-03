import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector((state) => !!state.authedUser);

  const location = useLocation();

  return loggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default PrivateRoute;
