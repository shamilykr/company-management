import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Button,
  Paper,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  tableCellClasses,
} from "@mui/material";

import { selectAllCompanies } from "./companySlice";

const defaultStyle = {
  headerStyle: {
    fontSize: 20,
    fontWeight: 600,
    flexGrow: 1,
  },
  parentDivStyle: {
    display: "flex",
    marginBottom: 20,
  },
  containerStyle: { margin: 20, marginTop: 40 },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // Color change for alternate row in table
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CompanyList: FC = () => {
  const navigate = useNavigate();
  const companies = useSelector(selectAllCompanies);

  const handleOnAddNew = () => {
    navigate("/company/add");
  };

  const handleOnRowClick = (companyID: string) => {
    navigate(`/company/${companyID}`);
  };

  return (
    <div style={defaultStyle.containerStyle}>
      <div style={defaultStyle.parentDivStyle}>
        <div
          style={defaultStyle.headerStyle}
          data-testid="companyListPageHeading"
        >
          Company List
        </div>
        <Button
          variant="contained"
          onClick={handleOnAddNew}
          data-testid="addCompanyButton"
        >
          Add company
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell align="center">Company Domain</StyledTableCell>
              <StyledTableCell align="center">Company Sector</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company, index) => (
              <Tooltip
                key={company.id}
                title="Click to edit the details"
                followCursor
              >
                <StyledTableRow
                  key={company.id}
                  onClick={() => handleOnRowClick(company?.id)}
                  data-testid={`companyDetailsRow_${index}`}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    data-testid={`companyName_tableRow_${index}`}
                  >
                    {company.companyName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {company.companyDomain}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    data-testid={`companySector_tableRow_${index}`}
                  >
                    {company.companySector}
                  </StyledTableCell>
                </StyledTableRow>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompanyList;
