import React from "react";
import { render, screen } from "@testing-library/react";
import Dialog from "components/Dialog";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

describe("Dialog component", () => {
  test("Should show the title ", () => {
    render(
      <Provider store={store}>
        <Router>
          <Dialog open showTitle title="Test title"/>
        </Router>
      </Provider>
    );
    const DialogScreen = screen.getByTestId(
      "alert-dialog-title"
    );

    expect(DialogScreen).toHaveTextContent("Test title");
  });

  test("Should show the description", () => {
    render(
      <Provider store={store}>
        <Router>
          <Dialog open description="Test description"/>
        </Router>
      </Provider>
    );
    const DialogScreen = screen.getByTestId(
      "alert-dialog-description"
    );

    expect(DialogScreen).toHaveTextContent("Test description");
  });

  test("Should display primary button and is enabled", async() => {
    await render(
      <Provider store={store}>
        <Router>
          <Dialog open description="Test description"/>
        </Router>
      </Provider>
    );
    const primaryButton = screen.getByTestId("dialog-primary-button");
    expect(primaryButton).toBeTruthy();
    expect(primaryButton).not.toBeDisabled();
  });

  test("Should display secondary button and is enabled", async() => {
    await render(
      <Provider store={store}>
        <Router>
          <Dialog open description="Test description" showSecondaryButton/>
        </Router>
      </Provider>
    );
    const secondaryButton = screen.getByTestId("dialog-secondary-button");
    expect(secondaryButton).toBeTruthy();
    expect(secondaryButton).not.toBeDisabled();
});
});
