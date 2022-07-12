import React from "react";
import { render, screen } from "@testing-library/react";
import CompanyList from "containers/company-list";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

describe("Company List Page", () => {
  test("Should show company list page heading", () => {
    render(
      <Provider store={store}>
        <Router>
          <CompanyList />
        </Router>
      </Provider>
    );
    const companyListScreenHeading = screen.getByTestId(
      "companyListPageHeading"
    );

    expect(companyListScreenHeading).toHaveTextContent("Company List");
  });
  test("Should show Add company CTA", () => {
    render(
      <Provider store={store}>
        <Router>
          <CompanyList />
        </Router>
      </Provider>
    );

    const addCompantButton = screen.getByTestId("addCompanyButton");
    expect(addCompantButton).toBeTruthy();
    expect(addCompantButton).toBeEnabled();
    expect(addCompantButton).toHaveTextContent("Add company");
  });

  test("Company name and company sector fields should not be empty in table", () => {
    const companies = [
      {
        id: "1",
        companyName: "ABC Company Private Ltd",
        companyDomain: "Food and beverages",
        companySector: "F&C",
      },
      {
        id: "2",
        companyName: "Keyvalue software systems",
        companyDomain: "Development",
        companySector: "IT",
      },
      {
        id: "3",
        companyName: "Info Solutions Pvt ltd",
        companyDomain: "Service",
        companySector: "IT",
      },
    ];
    render(
      <Provider store={store}>
        <Router>
          <CompanyList />
        </Router>
      </Provider>
    );

    companies.map((company, index) => {
      const companyName_tableRow = screen.getByTestId(
        `companyName_tableRow_${index}`
      );
      const companySector_tableRow = screen.getByTestId(
        `companySector_tableRow_${index}`
      );
      expect(companyName_tableRow).toBeTruthy();
      expect(companySector_tableRow).toBeTruthy();
    });
  });
});
