import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("NavBar component", () => {
  const authedUser = "sarahedo";
  const mockStore = configureStore([]);
  const store = mockStore({ authedUser });

  it("displays all expected links", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    const homeLink = screen.getByText("HomePage");
    const leaderboardLink = screen.getByText("Leaderboard");
    const newPollLink = screen.getByText("New Poll");

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    expect(leaderboardLink).toBeInTheDocument();
    expect(leaderboardLink).toHaveAttribute("href", "/leaderboard");

    expect(newPollLink).toBeInTheDocument();
    expect(newPollLink).toHaveAttribute("href", "/add");
  });
});
