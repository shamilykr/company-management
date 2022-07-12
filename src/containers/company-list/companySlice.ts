import { createSlice } from "@reduxjs/toolkit";

const initialState = [
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

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    // Add a new company to state
    addCompany: (state, action) => {
      state.push(action.payload);
    },
    // Edit the company data matches the id in payload
    editCompany: (state, action) => {
      const { id } = action.payload;
      const updatedState = state.map((company) => {
        if (company.id == id) {
          return { ...action.payload };
        } else return company;
      });
      return updatedState;
    },
    resetCompanies: () => initialState,
  },
});

export const selectAllCompanies = (state) => state.companies;
export const { addCompany, editCompany, resetCompanies } = companySlice.actions;
export default companySlice.reducer;
