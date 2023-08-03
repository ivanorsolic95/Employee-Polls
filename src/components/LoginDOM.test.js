import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

const mockStore = createStore(rootReducer, applyMiddleware(thunk));

const renderWithRedux = (component) => {
  return render(<Provider store={mockStore}>{component}</Provider>);
};

describe("Login Component", () => {
  it("should display an error message when the user enters an incorrect username or password", async () => {
    renderWithRedux(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByTestId("login-button");

    fireEvent.change(usernameInput, { target: { value: "wrongUsername" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
    fireEvent.click(loginButton);

    await waitFor(
      () => screen.findByText("Wrong username or password, please try again!"),
      { timeout: 8000 }
    );
    const errorMessage = screen.getByText(
      "Wrong username or password, please try again!"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders username field, password field, and submit button", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByTestId("login-button");

    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("type", "text");

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });
});
