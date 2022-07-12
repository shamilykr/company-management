import React, { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { Button, Paper, Typography } from "@mui/material";

import TextInput from "components/TextInput";
import SelectInput from "components/SelectInput";
import { companySectors } from "constants/company";
import {
  addCompany,
  editCompany,
  selectAllCompanies,
} from "../company-list/companySlice";
import { Company } from "types/company";

const CompanyDetail: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companies: Company[] = useSelector(selectAllCompanies);

  // On edit the id is taken from URL params
  const { companyId } = useParams<{ companyId: string }>();

  useEffect(() => {
    if (companyId) {
      const currentCompany = companies.find(
        (company) => company.id === companyId
      );
      setCompanyDetails({ ...currentCompany });
    }
  }, [companyId]);

  const [companyDetails, setCompanyDetails] = useState({
    id: "",
    companyName: "",
    companyDomain: "",
    companySector: "",
  });
  const [isError, setError] = useState(false);

  const handleOnclickSave = () => {
    const data = { ...companyDetails };
    // Check if name / domain are empty - if empty keeps as error
    if (
      companyDetails.companyName === "" ||
      companyDetails.companySector === ""
    ) {
      setError(true);
    } else {
      // If company id in URL params , performs edit
      if (companyId) {
        dispatch(
          editCompany({
            ...data,
          })
        );
      } else {
        dispatch(
          addCompany({
            ...data,
            id: nanoid(),
          })
        );
      }

      navigate("/");
    }
  };

  const handleOnClickCancel = () => {
    navigate("/");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setError(false);
    setCompanyDetails({
      ...companyDetails,
      [type]: event.target.value,
    });
  };

  const { companyName, companyDomain, companySector } = companyDetails;

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
      <Typography
        variant="h4"
        align="center"
        component="h1"
        style={{ padding: 16 }}
        data-testid="companyDetailPageHeading"
      >
        {companyId ? "Edit Company" : "Add Company"}
      </Typography>
      <Paper style={{ padding: 16 }}>
        <TextInput
          width="100%"
          label="Company Name"
          value={companyName}
          isRequied={true}
          isError={isError && companyName === ""}
          onChange={(event) => handleChange(event, "companyName")}
          data-testid="companyNameInputField"
        />
        <TextInput
          width="100%"
          label="Company Domain"
          value={companyDomain}
          onChange={(event) => handleChange(event, "companyDomain")}
          data-testid="companyDomainInputField"
        />
        <SelectInput
          width="50%"
          label="Company Sector"
          value={companySector}
          isRequied={true}
          isError={isError && companySector === ""}
          onChange={(event) => handleChange(event, "companySector")}
          options={companySectors}
          data-testid="companySectorInputField"
        />
        <div style={{ display: "flex", marginBottom: 20, marginTop: 40 }}>
          <Button
            variant="contained"
            onClick={handleOnclickSave}
            data-testid="saveButton"
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={handleOnClickCancel}
            style={{ marginLeft: 20 }}
            data-testid="cancelButton"
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default CompanyDetail;
