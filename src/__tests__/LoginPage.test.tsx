import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "containers/login";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-test-renderer";

describe("Login Page", () => {
  test("Should display login screen title", async () => {
    await act(async () =>
      render(
        <Router>
          <LoginPage />
        </Router>
      )
    );
    const loginScreenTitle = screen.getByTestId("loginPageHeading");
    expect(loginScreenTitle).toBeTruthy();
    expect(loginScreenTitle).toHaveTextContent("Login to manage");
  });

  test("Should display email and password field in login page", async () => {
    await act(async () =>
      render(
        <Router>
          <LoginPage />
        </Router>
      )
    );
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");
    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
  });

  test("Should display Login buttons and it should be emabled", async () => {
    await act(async () =>
      render(
        <Router>
          <LoginPage />
        </Router>
      )
    );
    const normalLoginButton = screen.getByTestId("loginButton");
    const googleLoginButton = screen.getByTestId("googleLoginButton");
    expect(normalLoginButton).toBeTruthy();
    expect(googleLoginButton).toBeTruthy();
    expect(normalLoginButton).not.toBeDisabled();
    expect(googleLoginButton).not.toBeDisabled();
  });
});
