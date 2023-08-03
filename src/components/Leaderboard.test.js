import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import Leaderboard from "./Leaderboard";

const store = createStore(rootReducer);

describe("Leaderboard component", () => {
  it("displays the correct user name, number of questions asked, and number of questions answered", () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    const users = store.getState().users;
    Object.values(users).forEach((user) => {
      const userNameElement = screen.getByText(user.name);
      const answeredQuestionsElement = screen.getByText(
        Object.keys(user.answers).length.toString(),
        { selector: "td" }
      );
      const createdQuestionsElement = screen.getByText(
        user.questions.length.toString(),
        { selector: "td" }
      );

      expect(userNameElement).toBeInTheDocument();
      expect(answeredQuestionsElement).toBeInTheDocument();
      expect(createdQuestionsElement).toBeInTheDocument();
    });
  });
});
