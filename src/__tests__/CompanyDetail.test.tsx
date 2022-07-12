import React from "react";
import { render, screen } from "@testing-library/react";
import CompanyDetail from "containers/company";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

describe("Company Details Page", () => {
  test("Should show Add Company Details page heading", () => {
    render(
      <Provider store={store}>
        <Router>
          <CompanyDetail />
        </Router>
      </Provider>
    );
    const companyDetailPageHeading = screen.getByTestId(
      "companyDetailPageHeading"
    );
    expect(companyDetailPageHeading).toBeTruthy();
    expect(companyDetailPageHeading).toHaveTextContent("Add Company");
  });
  test("Should show Add Company Details form fields ,save and cancel button", () => {
    render(
      <Provider store={store}>
        <Router>
          <CompanyDetail />
        </Router>
      </Provider>
    );
    const companyNameInputField = screen.getByLabelText(/Company Name/);
    const companyDomainInputField = screen.getByLabelText(/Company Domain/);
    const companySectorInputField = screen.getByLabelText(/Company Sector/);
    const saveButton = screen.getByTestId("saveButton");
    const cancelButton = screen.getByTestId("cancelButton");
    expect(companyNameInputField).toBeTruthy();
    expect(companyDomainInputField).toBeTruthy();
    expect(companySectorInputField).toBeTruthy();
    expect(saveButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
    expect(saveButton).not.toBeDisabled();
    expect(cancelButton).not.toBeDisabled();
    expect(saveButton).toHaveTextContent(/Save/);
    expect(cancelButton).toHaveTextContent(/Cancel/);
  });

  test("Company name and company sector fields should be required field", () => {
    render(
      <Provider store={store}>
        <Router>
          <CompanyDetail />
        </Router>
      </Provider>
    );
    const companyNameInputField = screen.getByLabelText(/Company Name/);
    const companySectorInputField = screen.getByLabelText(/Company Sector/);

    expect(companyNameInputField).toBeTruthy();
    expect(companySectorInputField).toBeTruthy();
    expect(companyNameInputField).toBeRequired();
  });
});
