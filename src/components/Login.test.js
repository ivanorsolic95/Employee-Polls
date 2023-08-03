import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import Login from "./Login";

describe("Login", () => {
  const mockStore = configureStore([]);
  const store = mockStore({});

  it("matches the snapshot when component is rendered", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
