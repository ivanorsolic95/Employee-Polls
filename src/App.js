import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { handleInitialData } from "./actions/shared";
import Dashboard from "./components/Dashboard";
import NewQuestion from "./components/NewQuestion";
import Leaderboard from "./components/Leaderboard";
import Poll from "./components/Poll";
import PrivateRoute from "./components/ProtectedRoute";
import Error404 from "./components/Error404";

const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => !!state.authedUser);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div>
      {loggedIn && <NavBar />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          exact
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          exact
          element={
            <PrivateRoute>
              <NewQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:id"
          exact
          element={
            <PrivateRoute>
              <Poll />
            </PrivateRoute>
          }
        />
        <Route path="/404" exact element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
